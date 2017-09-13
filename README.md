# gulp frontend starter


## usage
+ clone this repository `git clone https://gitub.com/buuug7/gulp-frontend-starter YOUR_PROJECT_NAME`
+ run `npm install` or `yarn`
+ run `npm run watch` or `npm run build` to start your work
    - `npm run watch` build and watch your source code under `src` directory
    - `npm run build` build your source code to dist directory 

## include
+ [jquery](https://github.com/jquery/jquery)
+ [bootstrapV4](https://github.com/twbs/bootstrap)
+ [popper.js](https://github.com/FezVrasta/popper.js)


## directory structure
+ `src` your source code, all your work will be in this directory
    - `images` all your images puts here
    - `libs` the files of your project needed packages 
    - `scripts` all your javascript file 
    - `scss` all your scss files
+ `dist` the output of your project 


## sprite your icons ?
+ first put your icons images to `images/icons` directory
+ and then run `gulp sprite`
+ your will see the generated file `sprite.png` and `sprite.css` in the `dist/images` and `dist/styles` directory
+ this is default config,you can  customize the configuration in the `gulpfile.bable.js` file 

## create github repository from cli
`curl -u 'username' https://api.github.com/user/repos -d '{"name":"RepoName"}'`
