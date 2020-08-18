import {AlignJustify, AlignLeft, AlignRight, AlignCenter, List} from 'react-feather'
import itemsTypes from './components/itemsTypes'

const SFBolderTool =  {
    name: 'SFBolderTool',
    type: itemsTypes.BaseItem,
    props: {
        children: 'B',
        onClick: () => {
            const sel = window.getSelection()
            if (sel.type === 'Range') {
                document.execCommand('bold')
            }
        },
    }
}

const SFItalicTool = {
    name: 'SFItalicTool',
    type: itemsTypes.BaseItem,
    props: {
        children: <i>I</i>,
        onClick: () => {
            const sel = window.getSelection()
            if (sel.type === 'Range') {
                document.execCommand('italic')
            }
        }
    }
}

const SFJustifyFullTool = {
    name: 'SFJustifyFullTool',
    type: itemsTypes.BaseItem,
    props: {
        children: <AlignJustify />,
        onClick: () => {
            const sel = window.getSelection()
            if (sel.type === 'Range') {
                document.execCommand('justifyFull')
            }
        }
    }
}

const SFJustifyLeftTool = {
    name: 'SFJustifyLeftTool',
    type: itemsTypes.BaseItem,
    props: {
        children: <AlignLeft />,
        onClick: () => {
            const sel = window.getSelection()
            if (sel.type === 'Range') {
                document.execCommand('justifyLeft')
            }
        }
    }
}

const SFJustifyRightTool = {
    name: 'SFJustifyRightTool',
    type: itemsTypes.BaseItem,
    props: {
        children: <AlignRight />,
        onClick: () => {
            const sel = window.getSelection()
            if (sel.type === 'Range') {
                document.execCommand('justifyRight')
            }
        }
    }
}

const SFJustifyCenterTool = {
    name: 'SFJustifyCenterTool',
    type: itemsTypes.BaseItem,
    props: {
        children: <AlignCenter />,
        onClick: () => {
            const sel = window.getSelection()
            if (sel.type === 'Range') {
                document.execCommand('justifyCenter')
            }
        }
    }
}

const SFSelectFontTool = {
    name: 'SFSelectFontTool',
    type: itemsTypes.DropdownItem,
    props: {
        defaultValue: 'Hello world',
        onChange: async () => {
            console.log('hi')
        },
        items: [{title: 'Arial'}]
    }
}

const SFFontSizeTool = {
    name: 'SFFontSizeTool',
    type: itemsTypes.DropdownItem,
    props: {
        defaultValue: '16',
        onChange: async (some, options) => {
            const fontSize = options[options.selectedIndex].value
            document.execCommand('fontSize', false, '4')
        },
        items: [{title: '17', value: 17}]
    }
}

export {SFBolderTool, SFItalicTool, SFJustifyFullTool, SFJustifyLeftTool, SFJustifyRightTool,
    SFJustifyCenterTool, SFSelectFontTool, SFFontSizeTool}