import fs from 'fs-jetpack'
import {remote} from 'electron'
import {v4 as uuidv4} from 'uuid'
import electronLocalShortcut from 'electron-localshortcut'

class FileManager {
    constructor () {
        this.state = {
            openedFilePath: null
        }

        this.remote = remote || null
        this.currentWinow = this.remote ? this.remote.getCurrentWindow() : null
    }

    _fixBlockMap = (blockMap) => {
        if (!blockMap && !JSON.parse(blockMap)) {
            throw new Error('Cant validate document')
        }

        return blockMap.map(value => ({...value, id: uuidv4()}))
    }

    showErrorDialog = (title, content) => {
        if (this.currentWinow) {
          this.remote.dialog.showErrorBox(title, content)
        }
    }
    
    
    _loadBlockMapFromFile = async () => {
        if (this.currentWinow) {
            return await this.remote.dialog.showOpenDialog(this.currentWindow).then(async value => {
                if (!value.filePaths.length < 1) {
                    const blockMap = await fs.readAsync(value.filePaths[0], 'json')
                    .catch(reason => {
                    this.showErrorDialog('Error file opening', `${reason}`)
                    })
        
                    return {blockMap, filePath: value.filePaths[0]}
                } 
    
                return null
            })
        }
    }
    
    openFile = async () => {
        return await this._loadBlockMapFromFile().then(async data => {
            if (!data && !data.blockMap) {
                return
            }
            
            console.log(data.blockMap)

            this.state.openedFilePath = data.filePath
            return {blockMap: this._fixBlockMap(data.blockMap), filePath: this.state.openedFilePath}
        }).catch(reason => console.log('Error file open', reason))
    }
    
    saveFile = async (blockMap) => {
        if (this.currentWinow) {
            return fs.writeAsync(this.state.openedFilePath, blockMap)
            .then(() => console.log('saved ok', this.state.openedFilePath, blockMap))
            .catch(reason => {
            this.showErrorDialog('Error file saving', `${reason}`)
            })
        }
    }
    
    saveFileAs = async (blockMap) => {
        if (this.currentWinow) {
            return await remote.dialog.showSaveDialog(this.currentWindow).then(value => {
            if (value.filePath) {
                fs.writeAsync(value.filePath, blockMap)
                .then(() => console.log('saved as ', value.filePath))
                .catch(reason => this.showErrorDialog('Error file saving', reason))
            }
            })
        }
    }
}

export default FileManager