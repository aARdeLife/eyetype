const { app, BrowserWindow } = require("electron");
function createWindow() {
  const win = new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } });
  win.loadFile("index.html");
  win.setAlwaysOnTop(true, "floating");
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// Initialize webgazer
webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    var x = data.x; // x coordinate of gaze
    var y = data.y; // y coordinate of gaze

    // Loop through each key to see if the gaze coordinates are within its boundaries
    document.querySelectorAll('.key').forEach(function(key) {
        var rect = key.getBoundingClientRect();
        if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
            key.style.boxShadow = "0 0 10px red"; // Highlight the key with a red glow
        } else {
            key.style.boxShadow = "none"; // Remove the red glow
        }
    });
}).begin();

// Add event listener for the 'Select Key' button
document.getElementById('selectKey').addEventListener('click', function() {
    // Find the highlighted key and add its value to the output
    document.querySelectorAll('.key').forEach(function(key) {
        if (key.style.boxShadow === "0 0 10px red") {
            output.value += key.innerText;
        }
    });
});
