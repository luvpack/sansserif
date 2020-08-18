import Entity from './Entity'

class Paragraph extends Entity {
}


// old realization
/* class OldParagraph extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        text: this.props.text || ''
      }

      this.divRef = React.createRef()
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.text !== this.props.text) {
        this.setState({text: nextProps.text})
      }
    }
    
    componentDidMount () {
      this.divRef.current.addEventListener('focus', this.props.onFocus)
      this.divRef.current.innerHTML = this.state.text
      this.divRef.current.focus()
      
    }

    componentDidUpdate () {
      this.divRef.current.innerHTML = this.state.text
    }
  
    componentWillUnmount () {
      this.divRef.current.removeEventListener('focus', this.props.onFocus)
      // this.divRef.current.removeEventListener('focus', this.onChange)
    }
  
    render () {
      return <div className="paragraph" ref={this.divRef} contentEditable></div>
    }
}*/

export default Paragraph