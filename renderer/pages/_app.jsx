import React from 'react'
import Head from 'next/head'
import App from 'next/app'

import TopBar from '../components/TopBar'

import '../public/editor.css'
import '../public/app.css'

class SansSerif extends App {
  constructor (props){
    super(props)
    this.theme = {
      day: `
        body {
          scrollbar-color: black white;
          transition: .2s;
          background-color: #F6F6F6 !important;
          color: #000000 !important;
        }
        
        ::-webkit-scrollbar-thumb { height: 20px; width: 3px; background-color: #D7D7D7; border-radius: 3px;}
        ::-webkit-scrollbar { width: 5px; background-color: #F6F6F6;}

        #editor .toolbar {
          background-color: white !important;
        }

        #editor a.toolbar__item:hover {
          background-color: #F6F6F6 !important;
        }

        #editor select {
          color: black;
        }

        #editor .block:focus-within {
          background-color: #EDEDED !important;
      }`,
      night: `
        body {
          transition: .2s;
          background-color: #222222 !important;
          color: #FFFFFF !important;
        }

        ::-webkit-scrollbar-thumb { height: 20px; width: 3px; background-color: #3D3D3D; border-radius: 3px; }
        ::-webkit-scrollbar {  width: 5px; background-color: #222222; }

        #editor .toolbar {
          background-color: #2F2F2F !important;
        }

        #editor select {
          color: white;
        }

        #editor a.toolbar__item:hover {
          background-color: #1E1E1E !important;
        }

        #editor .block:focus-within {
          background-color: #1E1E1E !important;
        }
      `,
    }

    this.state = {
      nightMode: false
    }
  }

  componentDidMount () {
    this.styleSheet = this._createStyle()
    this._toggleTheme(this.styleSheet)
  }
  
  componentDidUpdate () {
    this._toggleTheme(this.styleSheet)
  }

  componentDidCatch (error, errorInfo) {
    console.error('handled error', error )
  }

  _createStyle = () => {
    const styleSheet = document.createElement("style")
    styleSheet.type = "text/css"
    document.head.appendChild(styleSheet)

    return styleSheet
  }

  _toggleTheme = (el) => {
    if (!this.state.nightMode) {
      el.textContent = this.theme.day
    } else {
      el.textContent = this.theme.night
    }
  }

  _toggleNightMode = () => {
    this.setState({nightMode: !this.state.nightMode})
  }

  render () {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
          <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            <title>Sans Serif</title>
          </Head>
          <TopBar nightMode={this.state.nightMode} toggleNightMode={this._toggleNightMode}></TopBar>
          <main style={{padding: '5%'}}>
              <Component {...pageProps} />
          </main>
      </React.Fragment>
    );
  }
}

export default SansSerif
