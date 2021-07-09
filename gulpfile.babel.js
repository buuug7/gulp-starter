import { src, dest, watch, series } from "gulp";
import del from "delete";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import sourcemaps from "gulp-sourcemaps";
import browserSync from "browser-sync";
import webpack from "webpack";
import gulpWebpack from "webpack-stream";
import packageJson from "./package.json";

const sass = gulpSass(dartSass);
const browserSyncInstance = browserSync.create();

/**
 * delete dist directory
 * @param cb
 * @return {*}
 */
const clean = (cb) => del(["./dist"], cb);

/**
 * transform javascript and minify
 * @param reload set true to enable refresh browser
 * @return {*}
 */
function js(reload = false) {
  const webpackConfig = {
    output: {
      filename: "app.bundle.js",
    },
  };
  const logErr = (err, stat) => {
    if (err) console.log(err);
  };

  const rs = src("./src/**/app.js")
    .pipe(gulpWebpack(webpackConfig, webpack, logErr))
    .pipe(babel())
    .pipe(uglify())
    .pipe(dest("./dist"));

  return reload ? rs.pipe(browserSyncInstance.stream()) : rs;
}

/**
 * copy html of src directory to dist
 * @param reload set true to enable refresh browser
 * @return {Stream.Transform|NodeJS.ReadWriteStream}
 */
function copyHtml(reload = false) {
  const rs = src(["./src/**/*.html"]).pipe(dest("./dist"));
  return reload ? rs.pipe(browserSyncInstance.stream()) : rs;
}

/**
 * compile scss
 * @param reload set true to enable refresh browser
 * @return {*}
 */
function css(reload = false) {
  const rs = src(["./src/**/*.scss"])
    .pipe(sass())
    .pipe(autoprefixer(packageJson.browserslist))
    .pipe(dest("./dist"));

  return reload ? rs.pipe(browserSyncInstance.stream()) : rs;
}

/**
 * build
 */
export const build = series(clean, copyHtml, css, js);

/**
 * start
 * watch
 */
export const start = () => {
  browserSyncInstance.init({
    server: ["dist"],
  });

  watch(["./src/**/*.js"], () => js(true));
  watch(["./src/**/*.scss"], () => css(true));
  watch(["./src/**/*.html"], () => copyHtml(true));
};
