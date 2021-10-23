const { app, BrowserWindow } = require("electron")
const path = require("path")

try {
    require('electron-reloader')(module)
} catch (_) { }

const createWindow = () => {

    const win = new BrowserWindow({
        width: 600,
        height: 800,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'src/preload.js')
        }
    })
    win.loadFile('src/index.html')
}

app.whenReady().then(() => {
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})