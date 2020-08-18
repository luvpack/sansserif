 // set to state index of selected block 
 old_onEntityFocus = async (event, index) => {
    event.stopPropagation()
    await this.setState({selectedBlock: index}, () => console.log(index))
    await this._updateTextSelectedBlock(event)
  }
      

  _updateTextSelectedBlock = async (ev) => {
    // ev.stopPropagation()
    const copyBlockMap = Array.from(this.state.blockMap)

    if (!copyBlockMap[this.state.selectedBlock]) {
      return
    }

    // copyBlockMap[this.state.selectedBlock].data.text = ev.target.innerHTML
    await this.setState((prevState) => ({blockMap: copyBlockMap}), () => {
      //console.log(this.state.selectedBlock, this.state.blockMap[this.state.selectedBlock].data.text)
    }) 
  }

  blockOnKeyUp = async (event) => {
    event.stopPropagation()
    // remove block when length of symbols === 0
    if (event.key === 'Backspace' && event.currentTarget.innerHTML.length === 0) {
      let copyBlockMap = this.state.blockMap
      copyBlockMap = copyBlockMap.filter((block, index) => this.state.selectedBlock !== index)
      
      await this.setState((prevState) => ({...prevState, blockMap: copyBlockMap}))
    }

    if (event.key === 'Backspace' && event.target.innerHTML !== '') {
      event.stopPropagation()
      await this._updateTextSelectedBlock(event)
    }

    if (event.key.length < 2) {
      event.stopPropagation()
      await this._updateTextSelectedBlock(event)
    }
    // console.log(event)
}


onKeyDown = async (ev) => {
    // create new block
    if (ev.key === 'Enter') {
        ev.preventDefault()
        ev.stopImmediatePropagation()
        
        await this._updateTextSelectedBlock(ev)
        await this.createNewBlock(ev)
    }
  }


  _createListenersForBlocks () {
    for (const block of document.getElementsByClassName('block')) {
        block.firstChild.addEventListener('keyup', this.blockOnKeyUp)
        block.firstChild.addEventListener('keydown', this.onKeyDown)
        block.firstChild.addEventListener('cut', this._updateTextSelectedBlock)
        block.firstChild.addEventListener('paste', this._updateTextSelectedBlock)
        // block.firstChild.addEventListener('keypress', this.onKeyPress)
    }
}

_removeListenersForBlocks () {
  for (const block of document.getElementsByClassName('block')) {
    block.firstChild.removeEventListener('keyup', this.blockOnKeyUp)
    block.firstChild.removeEventListener('keydown', this.onKeyDown)
    block.firstChild.removeEventListener('cut', this._updateTextSelectedBlock)
    block.firstChild.removeEventListener('paste', this._updateTextSelectedBlock)
    // block.firstChild.removeEventListener('keypress', this.onKeyPress)
  }
}

createNewBlock = async (ev) => {
    const selectedBlock = this.state.selectedBlock
    // console.log('Creating new block', selectedBlock + 1)
    let copyBlockMap = Array.from(this.state.blockMap)

    const caretSelection = this._getCaretSelection(ev)

    const newBlock = Object.assign({}, {
        id: uuidv4(),
        type: copyBlockMap[selectedBlock].type,
        data: {
            text: this._convertFragmentToString(caretSelection)// copyBlockMap[selectedBlock].data.text.substr(, copyBlockMap[selectedBlock].data.text.length )
        }
    })

    // copyBlockMap[selectedBlock].data.text = copyBlockMap[selectedBlock].data.text.substr(0, copyBlockMap[selectedBlock].data.text.length - (copyBlockMap[selectedBlock].data.text.length- window.getSelection().anchorOffset))
    // ev.target.textContent = copyBlockMap[selectedBlock].data.text

    copyBlockMap.insert(selectedBlock + 1, newBlock)
    
    await this.setState((prevState) => ({...this.state, blockMap: copyBlockMap}), async () => {
      await this.setState((prevState) => ({selectedBlock: prevState.selectedBlock + 1}), async () => {
        await this._updateTextSelectedBlock(ev)
        // console.log(this.state.blockMap)
      })
    })
  }