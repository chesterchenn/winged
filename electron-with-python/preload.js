const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  run: () => ipcRenderer.invoke('run'),
});
