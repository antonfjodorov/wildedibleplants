'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');		// Combine files into 1
var uglify = require('gulp-uglify');		// Minify JS
var cleanCSS = require('gulp-clean-css');	// Minify CSS

var SRC = '../';
var DEST = '../public/';

gulp.task('default', ['minjs', 'mincss'], function(){});

gulp.task('mincss', function() {
	return gulp.src(SRC+'css/*.css')
	.pipe(concat('bundle.min.css'))
	.pipe(cleanCSS())
	.pipe(gulp.dest(DEST+'css/'));
});

gulp.task('minjs', function() {
	return gulp.src([
		SRC+'js/vendor/*.js',
		SRC+'js/*.js'
	])
	.pipe(concat('bundle.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest(DEST+'js/'));
});