"use strict";

var gulp = require('./gulp')([
  'startServer',
]);
var browserSync;

/**
 * compile - Compile script and styles
 */
var compile = gulp.parallel(compileScript, compileStyle);

/**
 * runWatch - Watch Script files and Style files for changes
 */
var runWatch = gulp.parallel(watchScript, watchStyle);

var startServer = (done) => {
  browserSync = gulp.
  done();
};

/**
 * serve - Compile code then start server
 */
var serve = gulp.series(compile, startServer);

/**
 * start - Serve the Server and start watching for changes
 */
var start = gulp.parallel(serve, runWatch);

exports.default = start;