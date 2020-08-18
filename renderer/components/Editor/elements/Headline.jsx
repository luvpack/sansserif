import React from 'react'
import Entity from './Entity'

class Headline extends Entity {
  render () {
    const element = React.createElement(`h${this.props.level ?? 2}`, {
            ref: this.textRef,
            // children: this.props.text,
            contentEditable: true,
            suppressContentEditableWarning: true,
      })
    return <div ref={this.focusableRef} tabIndex={this.props.index} className='block__wrapper'>
        {element}
      </div>
  }
}

/* class OldHeadline extends OldParagraph {
    constructor (props) {
      super(props)
      
      this.level = this.props.level ?? 2

      this.elementRef = React.createRef()
  
      if (this.props.level > 6 || this.props.level < 0 || !this.props.level) {
        this.level = 1
      }
    }

    componentDidMount () {
      this.elementRef.current.innerHTML = this.state.text
    }

    componentDidUpdate () {
      this.elementRef.current.innerHTML = this.state.text
    }

    render () {
      return <div ref={this.divRef} suppressContentEditableWarning={true} contentEditable> 
        {React.createElement(`h${this.props.level ?? 2}`, {
          ref: this.elementRef,
        children: this.state.text
      })}
      </div>
    }
}*/

export default Headline