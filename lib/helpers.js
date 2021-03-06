var exec = require('child_process').exec;

exports.printHelp = function() {
  console.error('\nValid Actions');
  console.error('-------------');
  console.error('init           - Initialize a Meteor Up project');
  console.error('setup          - Setup the server');
  console.error('');
  console.error('deploy         - Deploy app to server');
  console.error('archive <path>   - Build app bundle');
  console.error('build [--skip-archive] <path>   - Build app bundle');
  console.error('release <path> - Deploy app bundle created by mup build');
  console.error('reconfig       - Reconfigure the server and restart');
  console.error('');
  console.error('logs [-f -n]   - Access logs');
  console.error('');
  console.error('start          - Start your app instances');
  console.error('stop           - Stop your app instances');
  console.error('restart        - Restart your app instances');

};
