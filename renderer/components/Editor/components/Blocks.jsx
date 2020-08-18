import React from 'react'

class Blocks extends React.Component {
    render () {
      return (
        <div className='blocks'>
          {this.props.children}
        </div>
      )
    }
}

export default Blocks