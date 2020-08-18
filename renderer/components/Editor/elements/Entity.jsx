import React from 'react'

class Entity extends React.Component {
    options = {
        pasteWithoutTags: false,
        userPaste: true,
        allowedTags: ['SPAN', 'B', 'I', 'A'], // TODO: create allowed tags when user paste,
        withText: true,
        selectable: true
    }

    constructor (props) {
        super(props)

        this.wrapperRef = React.createRef()
        this.focusableRef = React.createRef()
        this.textRef = React.createRef()
    }

    keyDownHandler = (event) => {
        this.props.onKeyDown(event, this.textRef.current.innerHTML)
    }

    componentDidMount () {
        this.focusableRef.current.addEventListener('click', this.props.onFocus)
        this.focusableRef.current.focus()
        this.focusableRef.current.addEventListener('keydown', this.keyDownHandler)
        this.focusableRef.current.addEventListener('paste', this.props.handlePaste)
        
        if (this.options.withText) {
            this.textRef.current.innerHTML = this.props.text
        }
    }
  
    componentWillUnmount () {
        //this.focusableRef.current.blur()
        this.focusableRef.current.removeEventListener('paste', this.props.handlePaste)
        this.focusableRef.current.removeEventListener('keydown', this.keyDownHandler)
        this.focusableRef.current.removeEventListener('click', this.props.onFocus)
 
    }


    render () {
        return <div ref={this.focusableRef} className='block__wrapper'>
            <div ref={this.textRef} contentEditable></div>
        </div>
    }
}

export default Entity