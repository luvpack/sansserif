import React from 'react'
import {v4 as uuidv4} from 'uuid'

class DropdownItem extends React.Component {
    constructor (props) {
        super(props)

        if (!this.props.defaultValue || !this.props.items) {
            throw new Error('DropodownItem must contain defaultValue and items properties')
        }

        if (!this.props.onChange) {
            console.warn('You have not specified the onChange property that affects the event when an item is selected from the list')
        }

        this.ref = React.createRef()
    }
    
    render () {
        return (
            <select ref={this.ref} defaultValue='-1' onChange={(ev) => this.props.onChange(ev, this.ref.current.options)} className="toolbar__item dropdown">
                <option value="-1">{this.props.defaultValue}</option>
                {
                    this.props.items.map((option, index) => {
                        return <option key={uuidv4()} value={option.value}>{option.title}</option>
                    })
                }
            </select>
        )
    }
}

export default DropdownItem