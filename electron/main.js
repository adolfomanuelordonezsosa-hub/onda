// Onda — app de escritorio (Windows) hecha con Electron.
const { app, BrowserWindow, Menu, shell, session } = require('electron');
const path = require('path');

// Permite pasar a la siguiente canción sola aunque no hayas tocado la ventana.
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

let win = null;

function crearVentana() {
  win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 380,
    minHeight: 600,
    title: 'Onda',
    backgroundColor: '#0d0e12',
    icon: path.join(__dirname, '..', 'assets', 'icon.png'),
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      backgroundThrottling: false // que la música no se corte con la ventana minimizada
    }
  });

  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, '..', 'www', 'index.html'));
  win.once('ready-to-show', () => win.show());

  // Los enlaces externos se abren en el navegador normal.
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// Solo una ventana de Onda a la vez.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.whenReady().then(() => {
    // YouTube exige que su reproductor sepa desde qué app se usa (si no, sale "Error 153").
    session.defaultSession.webRequest.onBeforeSendHeaders(
      { urls: ['https://*.youtube.com/*', 'https://*.youtube-nocookie.com/*', 'https://*.googlevideo.com/*', 'https://*.ytimg.com/*'] },
      (details, callback) => {
        details.requestHeaders['Referer'] = 'https://com.adolfo.onda/';
        callback({ requestHeaders: details.requestHeaders });
      }
    );
    crearVentana();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) crearVentana();
  });
}
