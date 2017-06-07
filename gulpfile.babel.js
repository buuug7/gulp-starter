import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import babel from 'gulp-babel';
import concat from  'gulp-concat';
import del from 'del';
import gulpif from 'gulp-if';
import sprity from 'sprity';

let paths = {
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

gulp.task("copy:libs", () => {
    return gulp.src(paths.libsFrom, {
        base: 'node_modules'
    })
        .pipe(gulp.dest(paths.libsTo));
});

gulp.task('copy:html', () => {
    return gulp.src(paths.htmlFrom)
        .pipe(gulp.dest(paths.htmlTo));
});

gulp.task('styles', () => {
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
        .pipe(gulp.dest(paths.stylesTo))
        .pipe(gulp.dest('./src/styles'));
});

gulp.task('scripts', () => {
    return gulp.src(paths.scriptsFrom)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('app.js'))
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


gulp.task('watch', () => {
    gulp.watch(paths.htmlFrom, ['copy:html']);
    gulp.watch(paths.stylesFrom, ['styles']);
    gulp.watch(paths.scriptsFrom, ['scripts']);
});

gulp.task('default', ['copy:libs', 'watch']);
gulp.task('build', ['copy:libs', 'copy:html', 'styles', 'scripts']);