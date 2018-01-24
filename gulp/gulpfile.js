'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');			// Combine files into 1
var uglify = require('gulp-uglify');			// Minify JS
var cleanCSS = require('gulp-clean-css');		// Minify CSS
var htmlReplace = require('gulp-html-replace');	// Replace css and js scripts with bundles

var SRC = '../';
var DEST = '../public/';
var paths = {
	src:{
		css:  SRC+'css/**/*.css',
		img:  SRC+'img/*',
		fonts:SRC+'fonts/*',
		js:   SRC+'js/**/*.js',
		data: SRC+'data/*',
		index:SRC+'index.php'
	},
	dest:{
		css:  DEST+'css/',
		fonts:DEST+'fonts/',
		img:  DEST+'img/',
		js:   DEST+'js/',
		data: DEST+'data/',
		index:DEST+'/',
		bundlecss:'css/',
		bundlejs: 'js/',
	},
	bundle:{
		css: 'bundle.min.css',
		js:  'bundle.min.js'
	}
};

gulp.task('css', function(){
	return gulp.src(paths.src.css)
	.pipe(concat(paths.bundle.css))
	.pipe(cleanCSS())
	.pipe(gulp.dest(paths.dest.css));
});
gulp.task('js', function(){
	return gulp.src(paths.src.js)
	.pipe(concat(paths.bundle.js))
	.pipe(uglify())
	.pipe(gulp.dest(paths.dest.js));
});
gulp.task('img', function(){
	return gulp.src(paths.src.img)
	.pipe(gulp.dest(paths.dest.img));
});
gulp.task('fonts', function(){
	return gulp.src(paths.src.fonts)
	.pipe(gulp.dest(paths.dest.fonts));
});
gulp.task('data', function(){
	return gulp.src(paths.src.data)
	.pipe(gulp.dest(paths.dest.data));
});
gulp.task('index', function(){
	return gulp.src(paths.src.index)
	.pipe(htmlReplace({
		css:paths.dest.bundlecss + paths.bundle.css,
		js: paths.dest.bundlejs  + paths.bundle.js
	}))
	.pipe(gulp.dest(paths.dest.index));
});
gulp.task('default', [
		'css',
		'img',
		'js',
		'fonts',
		'data',
		'index'
	], function(){}
);
gulp.task('watch', function(){
	gulp.watch(paths.src.css, ['css']);
	gulp.watch(paths.src.js, ['js']);
	gulp.watch(paths.src.index, ['index']);
});