var spawn = require('child_process').spawn;

function buildApp(appPath, meteorBinary, buildLocation, skipArchiving, callback) {
  buildMeteorApp(appPath, meteorBinary, buildLocation, function(code) {
    if(code == 0) {
      if (skipArchiving) {
        callback();
        return;
      }
      archiveIt(buildLocation, callback);
    } else {
      console.log("\n=> Build Error. Check the logs printed above.");
      callback(new Error("build-error"));
    }
  });
}

function buildMeteorApp(appPath, meteorBinary, buildLocation, callback) {
  var executable = meteorBinary;
  var args = [
    "build", "--directory", buildLocation,
    "--server", "http://localhost:3000"
  ];
  
  var isWin = /^win/.test(process.platform);
  if(isWin) {
    // Sometimes cmd.exe not available in the path
    // See: http://goo.gl/ADmzoD
    executable = process.env.comspec || "cmd.exe";
    args = ["/c", "meteor"].concat(args);
  }

  var options = {cwd: appPath};
  var meteor = spawn(executable, args, options);
  var stdout = "";
  var stderr = "";

  meteor.stdout.pipe(process.stdout, {end: false});
  meteor.stderr.pipe(process.stderr, {end: false});

  meteor.on('close', callback);
}

module.exports = buildApp;
