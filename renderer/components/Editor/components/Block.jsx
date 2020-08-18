import React from 'react'
import SelectionUtils from '../lib/selection'

class Block extends React.Component {

  ref = React.createRef()
  childRef = React.createRef()

  selectionUtils = new SelectionUtils()

  onKeyDown = async (event) => {
    // event.stopPropagation()
    if (event.key === 'Backspace' && event.currentTarget.textContent.length === 0) { 
      await this.props.handleRemove(this.props.index) 
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
                  onKeyDown: this.onKeyDown,
                  onFocus: (ev) => this.props.onFocus(ev, this.props.index),
                  text: data.text ?? 'Enter some text', level: data.level ?? null})}
      </div>
    )
  }
}

export default Block