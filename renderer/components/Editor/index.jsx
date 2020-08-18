import React from 'react'
import {v4 as uuidv4} from 'uuid'
import {remote} from 'electron'
import electronLocalShortcut from 'electron-localshortcut'

import SelectionUtils from './lib/selection'
import fileManager from './lib/fileManager'

import {Headline, Paragraph, Image} from './elements'
import {Block, Blocks} from './components/index'

import SFInlineToolbar from './components/InlineToolbar'

const _remote = remote || null

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};


class Editor extends React.Component {
    constructor (props) {
      super(props)

      this.fileManager = new fileManager()
      this.selectionUtils = new SelectionUtils()

      this.blocksRef = React.createRef()

      this.state = {
        openedFilePath: null,
        selectedBlock: 0,
        blockMap: [
          {
            type: 'headline',
            id: uuidv4(),
            data: {
              text: 'Lorem Ipsum Dolor Sit Amet',
              level: 1
            },
          },
          {
            type: 'paragraph',
            id: uuidv4(),
            data: {
              text: '<i>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</i> sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit <b>anim id est laborum.</b>'
            }
          },
          {
            type: 'paragraph',
            id: uuidv4(),
            data: {
              text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
            }
          },
          {
            type: 'image',
            id: uuidv4(),
            data: {
              text: 'Lorem ipsum dolor sit amet',
              src: 'https://picsum.photos/720/720?grayscale'
            }
          }
        ]
      }
    }
  
    types = {
      paragraph: {
        title: 'paragraph',
        class: Paragraph
      },
      headline: {
        title: 'headline',
        class: Headline
      },
      image: {
        title: 'image',
        class: Image
      }
    }

    _getCaretSelection (event) {
      const selection = document.getSelection()

      if (selection.rangeCount){
        const selectRange = selection.getRangeAt(0)
        const currentBlockInput = event.target

        selectRange.deleteContents()

        if ( currentBlockInput ) {
          const range = selectRange.cloneRange()

          range.selectNodeContents(currentBlockInput)
          range.setStart(selectRange.endContainer, selectRange.endOffset)

          return range.extractContents()
        }
      }

      return null
    }

    _convertFragmentToString (fragment) {
      const div = document.createElement('div');
      div.appendChild( fragment.cloneNode(true) );
      return div.innerHTML
    }

    insertBlock = (position, blockObj) => {
      const copyBlockMap = Array.from(this.state.blockMap)

      blockObj = blockObj ?? Object.assign({}, {
        id: uuidv4(),
        type: 'paragraph',
        data: { text: '' }
      })

      copyBlockMap.insert(position ?? 0, blockObj)

      this.setState({blockMap: copyBlockMap})
    }

    createDefaultParagraph = (position=0, text=' ') => {
      this.insertBlock(position, Object.assign({}, {
        id: uuidv4(),
        type: 'paragraph',
        data: { text }
      }));
    }
   
    handleEnter = async (event) => {
      event.stopPropagation()
      this.createDefaultParagraph(
        this.state.selectedBlock + 1,
        this._convertFragmentToString(
          this._getCaretSelection(event)
        ))
    }

    handleInput = async (inputText) => {
      // event.stopPropagation()
      const copyBlockMap = Array.from(this.state.blockMap)
      const currentBlockIndex = this.state.selectedBlock

      if (!copyBlockMap[currentBlockIndex]) {
        return
      }
      copyBlockMap[currentBlockIndex].data.text = inputText
      //copyBlockMap[currentBlockIndex].data.text = event.target.innerHTML
      // console.log(copyBlockMap[currentBlockIndex].data.text)
      await this.setState({blockMap: copyBlockMap})
    }

    handleRemove = async (index) => {
      let copyBlockMap = Array.from(this.state.blockMap)
      copyBlockMap = copyBlockMap.filter((block, index) => this.state.selectedBlock !== index)
          
      await this.setState({blockMap: copyBlockMap})
    }
    
    handleFocus = async (event, index) => {
      event.target.focus()
      await this.setState({selectedBlock: index})
    }

    getSelectedBlockInstance = () => {
      return this.types[this.state.blockMap[this.state.selectedBlock].type].class
    }

    handlePaste = async (event, index) => {
      event.preventDefault()

      const clipboard = event.clipboardData || window.clipboardData
      const clipboardData = clipboard.getData('text/html')

      const clipboardDataElement = document.createElement('div')

      clipboardDataElement.innerHTML = clipboardData
      
      if (clipboardDataElement.childElementCount > 0) {
        const children = clipboardDataElement.children
        console.log(children)
        for (let child of children) {
          child.removeAttribute('style')

          if (this.getSelectedBlockInstance()) {
            if (child.tagName !== 'IMG' && child.tagName !== 'META') {
              console.log(this.getSelectedBlockInstance())
              const wrap = document.createElement('div')
              wrap.appendChild(child.cloneNode(true))
              document.execCommand('insertHTML', false, wrap.innerHTML)
            } else if (child.tagName === 'IMG') {
              console.log(child.src)
              this.insertBlock(this.state.selectedBlock + 1, {
                type: 'image',
                id: uuidv4(),
                data: {
                  text: '',
                  src: child.src
                }
              }) 
            }
          }
        }
      }
    }

    renderBlocks = (blockMap) => {
      return blockMap.map((block, index) => {
        let typeObj = this.types[block.type]

        return (
        <Block
          index={index}
          key={block.id}
          class={typeObj ? typeObj.class : this.types[0].class}
          type={block.type}
          data={block.data}
          onFocus={this.handleFocus}
          handleRemove={this.handleRemove}
          handleEnter={this.handleEnter}
          handleInput={this.handleInput}
          onPaste={this.handlePaste}
          >
        </Block>)
      })
    }

    componentDidUpdate () {
      if (this.state.blockMap.length < 1) {
        this.insertBlock()
      }
    }
  
    componentDidMount () {  
      // register hotkeys
      if (_remote) {
        electronLocalShortcut.register(_remote.getCurrentWindow(), 'Cmd+O', async () => {
          await this.fileManager.openFile().then(data => {
            if (data) {
              this.setState({blockMap: data.blockMap})
            }
          })
        })
        electronLocalShortcut.register(_remote.getCurrentWindow(), 'Cmd+S', () => {
          if (this.fileManager.state.openedFilePath) {
            this.fileManager.saveFile(this.state.blockMap)
          } else {
            this.fileManager.saveFileAs(this.state.blockMap)
          }
        })

        electronLocalShortcut.register(_remote.getCurrentWindow(), 'Cmd+Shift+S',  () => this.saveFileAs(this.state.blockMap))
      }
    }
  
    componentWillUnmount () {
      if (_remote) {
        electronLocalShortcut.unregisterAll(_remote.getCurrentWindow())
      }
    }
  
    render () {
      const blocks = this.renderBlocks(this.state.blockMap)
      return (
        <div spellCheck="false" style={{padding: 10}} id="editor">
          <SFInlineToolbar />
          <Blocks ref={this.blocksRef}>
            {blocks}
          </Blocks>
        </div>
      )
    }
}

export default Editor
  