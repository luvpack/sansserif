import React from 'react'
import {Moon} from 'react-feather'
import {remote} from 'electron'

//"#FFCF55"
class IconButton extends React.Component {
    state = {
        active: this.props.active,
        hover: false
    }

    onMouseEnter = () => this.setState({hover: true})
    onMouseLeave = () => this.setState({hover: false})

    render () {
        return (
            <Moon 
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onClick={this.props.onClick}
                style={{cursor: 'pointer', flex: 1}}
                fill={this.props.active ? '#FFCF55' : 'transparent'}
                color={this.props.active ? "#FFCF55" : (this.state.hover ? '#9F9F9F' : "#D7D7D7") }/>
        )
    }
}

class TopBar extends React.Component {
    enabledActionButtons = true
    
    data = [
        { name: 'close', color: '#FF5555', action: () => remote ? remote.getCurrentWindow().close() : null },
        { name: 'maxmize', color: '#FFCF55', action: () => remote ? remote.getCurrentWindow().minimize() : null },
        { name: 'minimize', color: '#3CD06E', action: () => remote ? remote.getCurrentWindow().isMaximized() ? remote.getCurrentWindow().unmaximize() : remote.getCurrentWindow().maximize() : null }
    ]

    pushActionButtons () {
        return (
            <ul style={{ display: 'flex', paddingLeft: 0, listStyle: 'none', flex: 0, marginRight: 20 }}>
            {
                this.data.map((value, index, arr) => <li key={index}>
                    <div style={{backgroundColor: value.color, whiteSpace: 'nowrap', display: 'inline-block', marginLeft: 3, marginRight: 3}} key={index} onClick={value.action} className="circle"></div>
                </li>)
            }
        </ul>
        )
    }

    render() {
        return (
            <div className="topbar" style={{display: 'flex', userSelect: 'none', justifyContent: 'space-between', flexDirection: 'row', width: '100%', position: 'fixed',marginBottom: 10, paddingLeft: 10, paddingRight: 10}}>
                <div style={{flexWrap: 'wrap', flex: 13}}>
                    { this.enabledActionButtons ? this.pushActionButtons() : null }
                </div>
                <div style={{display: 'flex', flex: 1, paddingTop: '15px'}}>
                    <IconButton onClick={this.props.toggleNightMode} active={this.props.nightMode}></IconButton>
                </div>
            </div>
        )
    }
}

export default TopBar