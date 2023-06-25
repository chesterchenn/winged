const { PythonShell } = require("python-shell");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  mainWindow.webContents.openDevTools();
}

const options = {
  mode: "text",
  // pathPath:
  //   "C:\\Users\\Administrator\\AppData\\Local\\Programs\\Python\\Python311",
  pythonOptions: ["-u"],
  scriptPath: path.join(__dirname),
  args: [],
};

ipcMain.handle("run", () => {
  PythonShell.run("my.py", options)
    .then((msg) => {
      console.log("msg::", msg);
    })
    .catch((err) => {
      console.error("err::", err);
    });
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
