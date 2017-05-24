var archiver = require('archiver');
var fs = require('fs');
var pathResolve = require('path').resolve;
var _ = require('underscore');

function archiveIt(buildLocation, callback) {
  callback = _.once(callback);
  var bundlePath = pathResolve(buildLocation, 'bundle.tar.gz');
  var sourceDir = pathResolve(buildLocation, 'bundle');
  var output = fs.createWriteStream(bundlePath);
  var archive = archiver('tar', {
    gzip: true,
    gzipOptions: {
      level: 6
    }
  });

  archive.pipe(output);
  output.once('close', callback);

  archive.once('error', function(err) {
    console.log("=> Archiving failed:", err.message);
    console.error(err)
    callback(err);
  });

  archive.directory(sourceDir, 'bundle').finalize();
}

module.exports = archiveIt;
