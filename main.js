const { app, Tray, Menu, BrowserWindow } = require('electron');
const path = require('path');

let iconPath = path.join(__dirname, 'instagram-w.png');
let appIcon = null;
let win = null;

app.dock.hide();

app.on('ready', () => {

  win = new BrowserWindow({
    width: 350, 
    height: 550, 
    show: false,
    fullscreenable: false,
    resizable: false,
    frame: false,
    transparent: true,
    webPreferences: {
      backgroundThrottling: false
    }
  });
 
  win.loadURL('https://www.instagram.com/');

  appIcon = new Tray(iconPath);

  let contextMenu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      accelerator: 'Command+Q',
      selector: 'terminate:'
    }
  ]);

  appIcon.on('click', function (event) {
    event.preventDefault();

    const position = getWindowPosition();
    win.setPosition(position.x, position.y, false); 
    win.show()
    win.focus()
  });

  win.on('blur', () => {
    if (!win.webContents.isDevToolsOpened()) {
      win.hide()
    }
  })
});

const getWindowPosition = () => {
  const windowBounds = win.getBounds();
  const trayBounds = appIcon.getBounds();
  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
  const y = Math.round(trayBounds.y + trayBounds.height + 4)

  return { x: x, y: y }
}
