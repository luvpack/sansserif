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
        await this.setState({rightOriented: false})
      } else if (rightCoord + 150 > contentRect.right && !this.state.rightOriented) {
        await this.setState({rightOriented: true})
      }
      //console.log(`${leftCoord} < ${contentRect.left} = ${leftCoord < contentRect.left}`,`${rightCoord} > ${contentRect.right} = ${rightCoord > contentRect.right}`)
    }
  
    handleSelectionRange = async (event) => {
        const selection = window.getSelection()
        if (selection.type === 'Range' && !this.setState.visible) {
          const selectionRect = this.selectionUtils.rect
          const targetRect = selection.anchorNode.parentElement.getBoundingClientRect()
          const toolbarRect = this.toolbarRef.current.getBoundingClientRect()
  
          const newCoords = {
            x: selectionRect.x - (toolbarRect.left < 0 ? this.state.left : toolbarRect.left),
            y: selectionRect.y +
              selectionRect.height,
          };
          
          if (selectionRect.width) {
            newCoords.x += Math.floor(selectionRect.width / 2)
          }

          const realLeftCoord = newCoords.x - 463 / 2;
          const realRightCoord = newCoords.x + 463 / 2;

          await this.orientationToggle(realLeftCoord, realRightCoord, targetRect)

          console.log(this.state.top)
          //  y: selectionRect.y +
          //selectionRect.height + toolbarRect.height 
  
          this.setState((prevState) => (
            {
              visible: true, 
              top: Math.floor(newCoords.y),
              left: newCoords.x, // (prevState.left + rect.x) < toolbarRect.width - 300? rect.x : prevState.left,
             // right: selectionRect.right + toolbarRect.width
              // bottom: rect.bottom - rect.height

            }
          ))
  
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
            transform: this.state.rightOriented ? `translateX(-60%)` : `translateX(-53px)`,
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