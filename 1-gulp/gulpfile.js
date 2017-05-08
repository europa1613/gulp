var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');


var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';

//Styles
gulp.task('styles', function() {
    console.log('Starting styles task');

    return gulp.src(CSS_PATH)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('public/dist'))
        .pipe(livereload());
});

//Scripts
gulp.task('scripts', function() {
    console.log('Starting scripts task');

    return gulp.src(SCRIPTS_PATH)
        .pipe(uglify())
        .pipe(gulp.dest('public/dist'))
        .pipe(livereload());
});

//Images
gulp.task('images', function() {
    console.log('Starting images task');
});

//Default
gulp.task('default', function() {
    console.log('Starting default task');
});


gulp.task('watch', function() {
    console.log('Starting watch task');
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts']);
});
