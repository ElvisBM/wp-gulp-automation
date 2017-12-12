var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
//Show Errors
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
//Auto Reload
var livereload = require('gulp-livereload');
//Require Theme Create
var fs = require('node-fs');
var fse = require('fs-extra');
var json = require('json-file');
var themeName = json.read('./package.json').get('themeName');
var themeDir = '../' + themeName;

gulp.task('sass', function(){
	gulp.src('./css/src/*.scss')
		.pipe(plumber(plumberErrorHandler))
		.pipe(sass())
		.pipe(gulp.dest('./css'))
 		.pipe(livereload());
});

gulp.task('js', function () {
	gulp.src('js/src/*.js')
		.pipe(plumber(plumberErrorHandler))
		.pipe(jshint())
		.pipe(jshint.reporter('fail'))
		.pipe(concat('theme.js'))
		.pipe(gulp.dest('js'))
		.pipe(livereload());
});

gulp.task('img', function() {
	gulp.src('img/src/*.{png,jpg,gif}')
		.pipe(plumber(plumberErrorHandler))
	    .pipe(imagemin({
	      	optimizationLevel: 7,
	      	progressive: true
		}))
    .pipe(gulp.dest('img'))
    .pipe(livereload());
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('css/src/*.scss', ['sass']);
	gulp.watch('js/src/*.js', ['js']);
	gulp.watch('img/src/*.{png,jpg,gif}', ['img']);
 
});

var plumberErrorHandler = { 
	errorHandler: notify.onError({
    	title: 'Gulp',
    	message: 'Error: <%= error.message %>'
  	})
};

gulp.task('default', ['sass', 'js', 'img', 'watch']);

gulp.task('init', function() {
  	fs.mkdirSync(themeDir, 765, true);
  	fse.copySync('theme-base', themeDir + '/');
});



