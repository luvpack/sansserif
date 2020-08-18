import React from 'react'
import ReactDOM from 'react-dom'

import Toolbar from './Toolbar'
import {SFBolderTool, SFItalicTool, SFJustifyFullTool,
  SFJustifyLeftTool, SFJustifyRightTool, SFJustifyCenterTool,
  SFSelectFontTool,
  SFFontSizeTool,
  SFListTool} from './toolsDefinitions'

class SFInlineToolbar extends React.Component {
    tools = [SFBolderTool, SFItalicTool, SFJustifyFullTool, SFJustifyLeftTool,
      SFJustifyCenterTool, SFJustifyRightTool, SFSelectFontTool, SFFontSizeTool]

    render () {
      return (
        <Toolbar tools={this.tools}/>
      )
    }
}

export default SFInlineToolbar