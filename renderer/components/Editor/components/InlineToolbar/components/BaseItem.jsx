import React from 'react'

class BaseItem extends React.Component {
    ref = React.createRef()

    constructor (props) {
      super(props)
      
      if (!this.props.children) {
        throw new Error('BaseItem must contain children property')
      }
    }
  
    render () {
      return (
        <a ref={this.ref} style={this.props.style} onClick={this.props.onClick} className="toolbar__item baseitem">
          { this.props.children}
        </a>
      )
    }
}

export default BaseItem