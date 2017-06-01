var gulp = require("gulp");
var sass = require("gulp-sass")
var sourcemaps = require("gulp-sourcemaps");
var autoprefixer = require("gulp-autoprefixer");
var babel = require("gulp-babel");
var concat=require("gulp-concat");
var del = require("del");


var paths = {
  libsFrom: [
    'node_modules/jquery/dist/**/*.js',
    'node_modules/bootstrap/dist/**/*'
  ],
  libsTo: 'dist/libs',
  stylesFrom: ['src/scss/**/*.scss'],
  stylesTo: 'dist/styles',
  scriptsFrom: ['src/scripts/**/*.js'],
  scriptsTo: 'dist/scripts',
  htmlFrom:['src/**/*.html'],
  htmlTo:'dist'
};


gulp.task("clean", function() {
  return del(["dist"]);
});

gulp.task("copy:libs", function() {
  return gulp.src(paths.libsFrom, {
      base: 'node_modules'
    })
    .pipe(gulp.dest(paths.libsTo));
});

gulp.task('copy:html',function() {
   return gulp.src(paths.htmlFrom)
   .pipe(gulp.dest(paths.htmlTo));
});

gulp.task('styles', function() {
  return gulp.src(paths.stylesFrom)
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
      outputStyle: 'nested' // Default: nested Values: nested, expanded, compact, compressed
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.stylesTo));
});

gulp.task('scripts', function() {
  return gulp.src(paths.scriptsFrom)
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(concat('app.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.scriptsTo));
});


gulp.task('watch',function() {
    gulp.watch(paths.htmlFrom,['copy:html']);
    gulp.watch(paths.stylesFrom,['styles']);
    gulp.watch(paths.scriptsFrom,['scripts']);
});

gulp.task('default',['copy:libs','watch']);
gulp.task('build',['copy:libs','copy:html','styles','scripts']);