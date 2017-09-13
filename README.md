# gulp frontend starter
build frontend project with gulp

## usage
+ clone repository `git clone https://gitub.com/buuug7/gulp-frontend-starter YOUR_PROJECT_NAME`
+ run `npm install` or `yarn`
+ run `npm run watch` or `npm run build` to start your work
    - `npm run watch` build and watch your source code under `src` directory
    - `npm run build` build your source code to dist directory

## feature
+ scss compile with [gulp-sass](https://github.com/dlmanning/gulp-sass)
+ CSS add vendor prefix with [autoprefixer](https://github.com/postcss/autoprefixer)
+ ES6 transform with [browserify](https://github.com/browserify/browserify)
+ sprite icons images with [gulp.spritesmith](https://github.com/twolfson/gulp.spritesmith)
+ server and reload sync with [browser-sync](https://github.com/BrowserSync/browser-sync)
+ file include with [gulp-file-include](https://github.com/coderhaoxin/gulp-file-include) plugin

## include
+ [jquery](https://github.com/jquery/jquery)
+ [bootstrapV4](https://github.com/twbs/bootstrap)
+ [popper.js](https://github.com/FezVrasta/popper.js)

## directory structure
+ `src` your source code, all your work will be in this directory
    - `images` all your images puts here
    - `scripts` all your javascript file
    - `scss` all your scss files
+ `dist` the output of your project

## where html files place?
you can put html files under `src` directory,but you can place them somewhere else accroding your preference.

## sprite your icons ?
+ first put your icons images to `images/icons` directory
+ and then run `gulp sprite`
+ your will see the generated file `sprite.png` and `sprite.css` in the `dist/images` and `dist/styles` directory
+ you can  customize the configuration in the `gulpfile.bable.js` file


## License
Code released under the [MIT License](https://github.com/buuug7/gulp-frontend-starter/blob/master/LICENSE).
