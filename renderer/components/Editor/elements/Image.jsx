import Entity from './Entity'

class Image extends Entity {
    render () {
        const element = React.createElement(`div`, {
                ref: this.focusableRef,
                // children: this.props.text,
                contentEditable: true,
                suppressContentEditableWarning: true,
          })
        return <div ref={this.wrapperRef} className='block__wrapper'>
            {element}
          </div>
      }
}

export default Image