import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import browserify from 'browserify';
import babelify from 'babelify';
import del from 'del';
import gulpif from 'gulp-if';
import sprity from 'sprity';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

let paths = {
    imagesFrom: ['src/images/**/*'],
    imagesTo: 'dist/images',
    libsFrom: [
        'node_modules/jquery/dist/**/*.js',
        'node_modules/bootstrap/dist/**/*',
        'node_modules/tether/dist/**/*',
    ],
    libsTo: 'dist/libs',
    stylesFrom: ['src/scss/**/*.scss'],
    stylesTo: 'dist/styles',
    scriptsFrom: ['src/scripts/**/*.js'],
    scriptsTo: 'dist/scripts',
    htmlFrom: ['src/**/*.html'],
    htmlTo: 'dist'
};


gulp.task("clean", () => {
    return del(["dist"]);
});

gulp.task('copy:images', () => {
    return gulp.src(paths.imagesFrom)
        .pipe(gulp.dest(paths.imagesTo));
});

gulp.task("copy:libs", () => {
    return gulp.src(paths.libsFrom, {
        base: 'node_modules'
    })
        .pipe(gulp.dest('./src/libs')) // for hint work in src directory
        .pipe(gulp.dest(paths.libsTo));
});

gulp.task('copy:html', () => {
    return gulp.src(paths.htmlFrom)
        .pipe(gulp.dest(paths.htmlTo));
});

gulp.task('styles', () => {
    return gulp.src(paths.stylesFrom)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            outputStyle: 'nested' // Default: nested Values: nested, expanded, compact, compressed
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.stylesTo))
        .pipe(gulp.dest('./src/styles')); // for hint work in src directory
});

gulp.task('scripts', () => {
    let b = browserify({debug: true})
        .transform('babelify', {
            comments: true
        })
        .require("./src/scripts/entry.js", {entry: true});
    return b.bundle()
        .on('error', function(err){
            console.log(err.message);
            this.emit('end');
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.scriptsTo));
});

// 合并多个图标文件到单张文件,并输出对应的css样式
gulp.task('sprites', () => {
    return sprity.src({
        src: './src/images/**/*.{png,jpg}',
        style: './_sprite.scss',
        processor: 'sass',
        prefix: 'icons',
        name: 'icons'
    })
        .pipe(gulpif('*.png', gulp.dest('./dist/images/'), gulp.dest('./src/scss')));
});

gulp.task('server', [], () => {
    browserSync({
        notify: true,
        logPrefix: 'GFS',
        server: ['dist'],
        port: 3000
    });
    gulp.watch([paths.imagesFrom], ['copy:images', browserSync.reload]);
    gulp.watch([paths.htmlFrom], ['copy:html', browserSync.reload]);
    gulp.watch([paths.stylesFrom], ['styles', browserSync.reload]);
    gulp.watch([paths.scriptsFrom], ['scripts', browserSync.reload]);
});

gulp.task('build', ['copy:images', 'copy:libs', 'copy:html', 'styles', 'scripts']);

gulp.task('default', ['build', 'server']);