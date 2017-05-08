var gulp = require('gulp');
var uglify = require('gulp-uglify');

var SCRIPTS_PATH = 'public/scripts/**/*.js';

//Styles
gulp.task('styles', function() {
    console.log('Starting styles task');
});

//Scripts
gulp.task('scripts', function() {
    console.log('Starting scripts task');

    return gulp.src(SCRIPTS_PATH)
        .pipe(uglify())
        .pipe(gulp.dest('public/dist'));
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
	gulp.watch(SCRIPTS_PATH, ['scripts']);
});
