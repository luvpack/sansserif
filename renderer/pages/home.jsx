import React from 'react'

import Editor from '../components/Editor/index'

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
          <div style={{padding: 30, paddingLeft: '15%', paddingRight: '15%'}}>
            <Editor />
          </div>
        );
    }
}

export default Home
  
