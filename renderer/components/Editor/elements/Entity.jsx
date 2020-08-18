import React from 'react'
import SelectionUtils from '../lib/selection'
class Entity extends React.Component {
    options = {
        pasteWithoutTags: false,
        userPaste: true,
        allowedTags: ['SPAN', 'B', 'I', 'A'], // TODO: create allowed tags when user paste,
        withText: true,
        selectable: true
    }

    selectionUtils = new SelectionUtils()

    constructor (props) {
        super(props)

        this.wrapperRef = React.createRef()
        this.focusableRef = React.createRef()
        this.textRef = React.createRef()
    }

    keyDownHandler = (event) => {
        const type = Object.getPrototypeOf(this).constructor.name
        const selection = window.getSelection()
        if (type === 'Image') {
            console.log(this.textRef.current.textContent, this.textRef.current.textContent.length, 1)
            selection.setPosition(this.textRef.current, 1)
        }

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