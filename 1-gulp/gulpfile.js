var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var del = require('del');

//Less plugins
var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var lessAutoprefix = new LessAutoprefix({
    browsers: ['last 2 versions']
});


//Handlebars
var handlebars = require('gulp-handlebars');
var handlebarsLib = require('handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');


//Image compression
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var jpegRecompress = require('imagemin-jpeg-recompress');


var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var SCSS_PATH = 'public/scss/**/*.scss';
var TEMPLATES_PATH = 'templates/**/*.hbs';
var IMAGES_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';//no spaces
//Styles
/*gulp.task('styles', function() {
    console.log('Starting styles task');

    return gulp.src(['public/css/reset.css', CSS_PATH])
        //gulp.src(CSS_PATH) //this add the reset at the end in concatinated file, making the reset to override.
        .pipe(plumber(function(err) {
            console.log('Styles task Error!');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init()) // before any modification happens
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8']
        }))
        .pipe(concat('styles.css'))
        .pipe(minifyCss())
        .pipe(sourcemaps.write()) //before the file is written to dest->dist folder 
        .pipe(gulp.dest('public/dist'))
        .pipe(livereload());
});*/

//SCSS task
/*gulp.task('styles', function() {
    console.log('Starting sass task');

    return gulp.src('public/scss/styles.scss') //only include main, since other files are imported.
        .pipe(plumber(function(err) {
            console.log('Styles task Error!');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init()) // before any modification happens
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 8']
        }))
        //.pipe(concat('styles.css')) // sass already imports
        //.pipe(minifyCss()) // minify in-built into gulp-sass
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write()) //before the file is written to dest->dist folder 
        .pipe(gulp.dest('public/dist'))
        .pipe(livereload());
});*/

//Less Task
gulp.task('styles', function() {
    console.log('Starting less task');

    return gulp.src('public/less/styles.less') //only include main, since other files are imported.
        .pipe(plumber(function(err) {
            console.log('Less task Error!');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init()) // before any modification happens
        .pipe(less({
            plugins: [lessAutoprefix]
        }))
        .pipe(minifyCss())
        .pipe(sourcemaps.write()) //before the file is written to dest->dist folder 
        .pipe(gulp.dest('public/dist'))
        .pipe(livereload());
});

//Scripts
gulp.task('scripts', function() {
    console.log('Starting scripts task');

    return gulp.src(SCRIPTS_PATH)
        .pipe(plumber(function(err) {
            console.log('scripts task error');
            console.log(err);
            this.emit('end');
        }))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/dist'))
        .pipe(livereload());
});

//Images
gulp.task('images', function() {
    console.log('Starting images task');
    return gulp.src(IMAGES_PATH)
        .pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                pngquant(),
                jpegRecompress()
            ]))
        .pipe(gulp.dest('public/dist/images'));
});



gulp.task('templates', function() {
    console.log('Starting templates task');

    return gulp.src(TEMPLATES_PATH)
        .pipe(handlebars({
            handlebars: handlebarsLib
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'templates',
            noRedeclare: true
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('public/dist'))
        .pipe(livereload());
});


//clean
gulp.task('clean', function() {
    return del.sync([
            'public/dist'
        ])
});


//Default
gulp.task('default', ['clean', 'images', 'templates', 'styles', 'scripts'], function() {
    console.log('Starting default task');
});


gulp.task('watch', ['default'], function() {
    console.log('Starting watch task');
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    //gulp.watch(CSS_PATH, ['styles']);
    //gulp.watch(SCSS_PATH, ['styles']);
    gulp.watch('public/less/styles.less', ['styles']);
    gulp.watch(TEMPLATES_PATH, ['templates']);
});
