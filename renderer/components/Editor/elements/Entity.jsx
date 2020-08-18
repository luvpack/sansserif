import React from 'react'

class Entity extends React.Component {
    options = {
        pasteWithoutTags: false,
        userPaste: false,
        allowedTags: ['SPAN', 'B', 'I', 'A'] // TODO: create allowed tags when user paste
    }

    constructor (props) {
        super(props)

        this.wrapperRef = React.createRef()
        this.focusableRef = React.createRef()
    }

    componentDidMount () {
        this.focusableRef.current.addEventListener('focus', this.props.onFocus)
        this.focusableRef.current.focus()
        this.focusableRef.current.addEventListener('keydown', this.props.onKeyDown)
        this.focusableRef.current.addEventListener('paste', this.props.handlePaste)
        this.focusableRef.current.innerHTML = this.props.text
    }
  
    componentWillUnmount () {
        //this.focusableRef.current.blur()
        this.focusableRef.current.removeEventListener('paste', this.props.handlePaste)
        this.focusableRef.current.removeEventListener('keydown', this.props.onKeyDown)
        this.focusableRef.current.removeEventListener('focus', this.props.onFocus)
 
    }


    render () {
        return <div ref={this.wrapperRef} className='block__wrapper'>
            <div ref={this.focusableRef} contentEditable></div>
        </div>
    }
}

export default Entity