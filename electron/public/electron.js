const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const IS_DEV = process.env.NODE_ENV === "development";

  const staticIndexPath = path.join(__dirname, "./index.html");
  const main = IS_DEV
    ? `http://localhost:4000`
    : url.format({
        pathname: staticIndexPath,
        protocol: "file:",
        slashes: true
      });
  mainWindow.loadURL(main);

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});
