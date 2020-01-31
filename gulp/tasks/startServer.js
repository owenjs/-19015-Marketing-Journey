// Import Browser Sync Plugin
var browserSync = require("browser-sync").create();

/**
 * startServer - Starts Local Server on port :3000 with the root folder of "./app"
 */
var startServer = () => {
  browserSync.init({
    server: "./app"
  });
  return browserSync;
};

exports.default = startServer;