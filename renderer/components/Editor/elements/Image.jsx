import Entity from './Entity'

class Image extends Entity {
    render () {
        const element = React.createElement(`div`, {
                children: <img src={this.props.src}></img>,
                suppressContentEditableWarning: true,
          })
        return <div ref={this.focusableRef} contentEditable={true} suppressContentEditableWarning={true} className='block__wrapper image'>
            {element}
            <a ref={this.textRef}></a>
          </div>
      }
}

export default Image