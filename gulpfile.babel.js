import { src, dest, watch, series, parallel } from 'gulp';
import del from 'delete';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import gulpSass from 'gulp-sass';
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';

const sass = gulpSass( dartSass );
const browserSyncInstance = browserSync.create();

// delete dist directory
const clean = cb => del(['./dist'], cb);

// transform javascript and minify
const js = () =>
    src('./src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest(['./dist']))
        .pipe(browserSyncInstance.stream());

// compile scss
const css = () =>
    src('./src/**/*.scss')
        .pipe(
            sass().on('error', sass.logError)
        )
        .pipe(
            autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            })
        )
        .pipe(dest(['./dist']))
        .pipe(browserSyncInstance.stream());

// build
export const build = series(clean, css, js);

// start
export const start = () => {
    browserSyncInstance.init({
        server: ['./']
    });
    watch('./src/**/*.js', js);
    watch('./src/**/*.scss', css);
    watch(
        ['./src/**/*.html', './index.html'],
        { events: 'change' },
        browserSyncInstance.reload
    );
};
