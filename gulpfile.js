var gulp = require("gulp");

// Import Gulp plugins.
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var babelify = require("babelify");

var babel = require("gulp-babel");
var sass = require("gulp-sass");
// Set the Sass Compiler we will use
sass.compiler = require("node-sass"); // Default
var concat = require("gulp-concat");
var plumber = require("gulp-plumber");
// Import Browser Sync Plugin
var browserSync = require("browser-sync").create();

/**
 * reload - Reloads the broswer
 * @param {fn} done: Call back when the reload has been completed
 */
var reload = (done) => {
  browserSync.reload();
  done();
};

/**
 * compileScript - Complies the Init javascript file to "./app/js/"
 */
var compileScript = () => {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: "./src/Init.js",
    debug: true,
    transform: [["babelify", { presets: ["@babel/preset-env"] }]]
  });

  return (
    b
      .bundle()
      .pipe(source("app.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      // Add transformation tasks to the pipeline here.
      .pipe(uglify())
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("./app/js/"))
  );
};

/**
 * compileStyle - Complies all scss files in the "./src/scss/" to "./app/css"
 */
var compileStyle = () => {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(concat("global.scss"))
    .pipe(sass())
    .pipe(gulp.dest("./app/css"))
    .pipe(browserSync.stream());
};

/**
 * watchScript - When a change happens to the javascript files, 
 *               re compiles and reloads broswer
 */
var watchScript = () => {
  gulp.watch("./src/app/**/*.js", gulp.series(compileScript, reload));
};

/**
 * watchStyle - When a change happens to the sass files, 
 *              re compiles and syncs with the browser
 */
var watchStyle = () => {
  gulp.watch("./src/scss/**/*.scss", compileStyle);
};

/**
 * startServer - Starts Local Server on port :3000 with the root folder of "./app"
 */
var startServer = () => {
  browserSync.init({
    server: "./app"
  });
};

/**
 * compile - Compile script and styles
 */
var compile = gulp.parallel(compileScript, compileStyle);

/**
 * runWatch - Watch Script files and Style files for changes
 */
var runWatch = gulp.parallel(watchScript, watchStyle);

/**
 * serve - Compile code then start server
 */
var serve = gulp.series(compile, startServer);

/**
 * start - Serve the Server and start watching for changes
 */
var start = gulp.parallel(serve, runWatch);

exports.default = start;
