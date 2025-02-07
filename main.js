const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 730, // Window width
    height: 840, // Window height
    icon: path.join(__dirname, "logo/logo.icns"),
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  // Load your HTML file
  mainWindow.loadFile("index.html");
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
