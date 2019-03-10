const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const ipc = require('electron').ipcMain
var fs = require('fs')

let win

let settings = ""

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 })

  // load the dist folder from Angular
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/xannot/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools optionally:
  win.webContents.openDevTools()

  win.on('closed', () => {
    let userdatadir = app.getPath('userData');
    console.log(userdatadir);
    fs.writeFile(userdatadir+"/settings.json", settings, (err) => {
      if(err) {
        console.log(err)
      }
    })
    win = null
  })
 
  let userdatadir = app.getPath('userData');
  try {
    let content = fs.readFileSync(userdatadir+"/settings.json");
    settings = content.toString();
  } catch(err) {
    settings = "{'folder':''}";
  }
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipc.on('save_annotations', function (event, obj) {
  fs.writeFile(obj.filename, obj.data, (err) => {
    if (err) {
      console.log(err);
      win.webContents.send("saveAnnotationResponse", err.message);
    } else {
      win.webContents.send("saveAnnotationResponse", "file saved:" + obj.filename);
    }
  });
})

ipc.on('getmeta', function (event, path) {
  try {
    let content = fs.readFileSync(path);
    win.webContents.send("getmetaresponse", content.toString());
  } catch(err) {
    console.log(err);
    win.webContents.send("getmetaresponse", "");
  }
})

ipc.on('getDirectoryImages', function (event, path) {
  console.log(path);
  settings = JSON.stringify({"folder":path});
  let files = fs.readdirSync(path);
  
  win.webContents.send("getDirectoryResponse", files);
})

ipc.on('getUserSettings', function(event) {
  win.webContents.send("getSettingsResponse", settings);
})