

/* class Block extends React.Component {
  state = {
    type: this.props.type,
    data: {
      text: this.props.text
    }
  }

  render () {
      return (
        <div className={`block__${this.state.type}`}>
          {
            React.createElement(elementName, {key, id, placeholder: 'Write anyone..',
              contentEditable: true, multiple: false, onChange: this.props.onChange,
              value: block.data.text}
            )
          }
        </div>
      )
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      blockMap: {
        0: {
          type: blockTypes.headline.title,
          data: {
            text: 'Headline'
          }
        }
      }
    }
  }

  handleKeydown = async (event) => {
    if (event.keyCode === 13) {
      const newBlockMap = Object.assign({}, {...this.state.blockMap,
        [Object.keys(this.state.blockMap).length]: {
          type: blockTypes.paragraph.title,
          data: {
            text: 'New line'
          }
        }
        }
      )

      event.currentTarget.blur()

      this.setState({blockMap: newBlockMap})
    }
  }

  addSubmitListeners () {
    Object.keys(blockTypes).map(key => {
      const type = blockTypes[key]
      for (const element of document.getElementsByTagName(type.elementName)) {
        element.addEventListener('keydown', this.handleKeydown)
        console.log(this.state.blockMap)
      }
    })
  }

  componentDidMount () {
    this.addSubmitListeners()
  }

  componentDidUpdate () {
    this.addSubmitListeners()
  }

  renderMap (blockMap) {
    return Object.keys(this.state.blockMap).map(key => {
      const block = this.state.blockMap[key]
      const elementName = blockTypes[block.type].elementName
      const id = key + elementName

      //document.getElementById(id).addEventListener('')

      return (
        <div className={`block__${block.type}`}>
          {
            React.createElement(elementName, {key, id, placeholder: 'Write anyone..',
              contentEditable: true, multiple: false, onChange: function (event) { console.log('hii') },
              value: this.state.blockMap[key].data.text },
              block.data.text
            )
          }
        </div>
      )
    })

  }

  render () {
    return (
      <div id="editor" suppressContentEditableWarning={true} style={{}}>
        { this.renderMap(this.state.blockMap) }
      </div>
    )
  }
} */
