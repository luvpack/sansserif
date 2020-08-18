import React from 'react'

import SelectionUtils from '../../lib/selection'
import itemsTypes from './components/itemsTypes'

class Toolbar extends React.Component {
    constructor (props) {
      super(props)
  
      this.selectionUtils = new SelectionUtils()
  
      this.state = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        visible: false,
        rightOriented: false
      }
      
      this.toolbarRef = React.createRef()
    }

    orientationToggle = async (leftCoord, rightCoord, contentRect) => {
      if (leftCoord < contentRect.left && this.state.rightOriented) {
        await this.setState({rightOriented: false}, () => console.log('left'))
      } else if (rightCoord > contentRect.right && !this.state.rightOriented) {
        await this.setState({rightOriented: true}, () => console.log('right'))
      }
      //console.log(`${leftCoord} < ${contentRect.left} = ${leftCoord < contentRect.left}`,`${rightCoord} > ${contentRect.right} = ${rightCoord > contentRect.right}`)
    }
  
    handleSelectionRange = async (event) => {
        const selection = window.getSelection()
        if (selection.type === 'Range' && !this.setState.visible) {
          const selectionRect = this.selectionUtils.rect
          const targetRect = selection.anchorNode.parentElement.getBoundingClientRect()
          const toolbarRect = this.toolbarRef.current.getBoundingClientRect()

          if (toolbarRect.right > targetRect.right) {
            console.log('right')
          } else if (toolbarRect.left < targetRect.left) {
            console.log('left')
          }

          console.log([toolbarRect.x, targetRect.left], [toolbarRect.right, targetRect.right])
          console.log((selectionRect.x + toolbarRect.width) < (targetRect.right + toolbarRect.width))
          this.setState((prevState) => (
            {
              visible: true, 
              top:  (window.scrollY + selectionRect.bottom),
              left: selectionRect.x,
              rightOriented: (selectionRect.x + toolbarRect.width) < (targetRect.right + toolbarRect.width)
            }
          ), () => console.log('newstate', this.state.rightOriented))
  
        } else {
          this.setState({visible: false})
        }
    }
  
    componentDidMount () {
      document.addEventListener('selectionchange', this.handleSelectionRange)
     //  this.toolbarRef.current.parentNode.addEventListener('mouseup', this.handleMouseUp)
      
    }
  
    componentWillUnmount () {
      document.removeEventListener('selectionchange', this.handleSelectionRange)
      //this.toolbarRef.current.parentNode.removeEventListener('mouseup', this.handleMouseUp)
    }
  
    render () {
      return (
        <div
          ref={this.toolbarRef}
          className="toolbar"
          style={{display: this.state.visible ? 'flex' : 'none',
            left: this.state.left, top: this.state.top,
            transform: !this.state.rightOriented ? `translateX(-75%)` : `translateX(-53px)`,
            //, bottom: this.state.bottom
          }}>
            {
              this.props.tools.map(tool => {
                return React.createElement(tool.type, {...tool.props, key: `${tool.name}`})
              })
            }
            
        </div>
      )
    }
}

export default Toolbar