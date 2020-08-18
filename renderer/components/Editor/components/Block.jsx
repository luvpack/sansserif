import React from 'react'
import SelectionUtils from '../lib/selection'

class Block extends React.Component {

  ref = React.createRef()
  childRef = React.createRef()

  selectionUtils = new SelectionUtils()

  onKeyDown = async (event) => {
    if (event.key === 'Backspace') { 
      if (this.props.type === 'image' && window.getSelection().anchorNode.textContent.length < 0) {
        event.preventDefault()
      }
      if (event.currentTarget.textContent.length === 0 && this.props.type !== 'image') {
        await this.props.handleRemove(this.props.index)
      }
    }

    if (event.key === 'Enter') {
      console.log(event)
      event.preventDefault()
      // event.stopImmediatePropagation()
      
      await this.props.handleEnter(event)
    }

    if (event.key.length < 2) {
      event.stopPropagation
      await this.props.handleInput(event)
    }
  } 

  render () {
    const {data} = this.props
    return (
      <div ref={this.ref} className='block'>
        {React.createElement(this.props.class, {
                  ref: this.childRef,
                  // onKeyUp: this.onKeyUp,
                  handlePaste: this.props.onPaste,
                  index: this.props.index,
                  onKeyDown: this.onKeyDown,
                  onFocus: (ev) => this.props.onFocus(ev, this.props.index),
                  text: data.text ?? undefined, level: data.level ?? null, src: data.src ?? null})}
      </div>
    )
  }
}

export default Block