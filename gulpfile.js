'use strict';

var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	clean = require('gulp-clean'),
	cleanCSS = require('gulp-clean-css'),
	concat = require('gulp-concat'),
	copy = require('gulp-copy'),
	csscomb = require('gulp-csscomb'),
	imagemin = require('gulp-imagemin'),
	less = require('gulp-less'),
	rename = require("gulp-rename"),
	replace = require('gulp-replace'),
	runSequence = require('run-sequence'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	wrap = require('gulp-wrap');

var config = require('./gulpconfig.json');

gulp.task('default', function () {
	runSequence(
		'build',
		'watch'
	);
});

gulp.task('build', function () {
	runSequence(
		'build-clean',
		[
			'build-fonts',
			'build-favicons',
			'build-images'
		],
		[
			'build-less',
			'build-css',
			'build-scripts',
			'build-scripts-libraries'
		],
		[
			'build-html'
		],
		buildEnd
	);
});

gulp.task('build-clean', function () {
	return gulp.src(config.public, {read: false})
	           .pipe(clean());
});

gulp.task('build-fonts', function () {
	return gulp.src(getFiles(config.fonts.files))
	           .pipe(gulp.dest(config.public + config.fonts.out));
});

gulp.task('build-favicons', function () {
	return gulp.src(getFiles(config.images.favicons.files))
	           .pipe(imagemin())
	           .pipe(gulp.dest(config.public + config.images.favicons.out));
});

gulp.task('build-images', function () {
	return gulp.src(getFiles(config.images.single.files))
	           .pipe(imagemin())
	           .pipe(gulp.dest(config.public + config.images.single.out));
});

gulp.task('build-less', function () {
	return gulp.src(getFiles(config.styles.less.files))
	           .pipe(csscomb())
	           .pipe(gulp.dest(function (file) {
		           return file.base;
	           }))
	           .pipe(sourcemaps.init())
	           .pipe(less())
	           .pipe(autoprefixer({
		                              browsers: config.styles.autoprefixer,
		                              cascade: false
	                              }))
	           .pipe(cleanCSS())
	           .pipe(rename(config.styles.less.css))
	           .pipe(sourcemaps.write('.'))
	           .pipe(gulp.dest(config.public + config.styles.out));
});

gulp.task('build-css', function () {
	return gulp.src(getFiles(config.styles.css.files))
	           .pipe(sourcemaps.init())
	           .pipe(concat(config.styles.css.css))
	           .pipe(cleanCSS())
	           .pipe(sourcemaps.write('.'))
	           .pipe(gulp.dest(config.public + config.styles.out));
});

gulp.task('build-scripts', function () {
	return gulp.src(getFiles(config.scripts.app.files))
	           .pipe(sourcemaps.init())
	           .pipe(wrap('(function () {\n\'use strict\';\n<%= contents %>\n})();'))
	           .pipe(concat(config.scripts.app.js))
	           .pipe(uglify())
	           .pipe(sourcemaps.write('.'))
	           .pipe(gulp.dest(config.public + config.scripts.out));
});

gulp.task('build-scripts-libraries', function () {
	return gulp.src(getFiles(config.scripts.vendors.files))
	           .pipe(sourcemaps.init())
	           .pipe(concat(config.scripts.vendors.js))
	           .pipe(uglify())
	           .pipe(sourcemaps.write('.'))
	           .pipe(gulp.dest(config.public + config.scripts.out));
});

gulp.task('build-html', function () {
	var now = new Date(),
		version = '?v' + now.getTime();
	return gulp.src(getFiles(config.html.files))
	           .pipe(replace('?version', version))
	           .pipe(gulp.dest(config.public + config.html.out));
});

gulp.task('watch', function () {
	gulp.watch(getFiles(config.styles.css.files), ['build-css', 'build-html']);
	gulp.watch(getFiles(config.styles.less.watch), ['build-less', 'build-html']);
	gulp.watch(getFiles(config.scripts.app.files), ['build-scripts', 'build-html']);
	gulp.watch(getFiles(config.scripts.vendors.files), ['build-scripts-libraries', 'build-html']);
	gulp.watch(getFiles(config.fonts.files), ['build-fonts']);
	gulp.watch(getFiles(config.html.files), ['build-html']);
	gulp.watch(getFiles(config.images.favicons.files), ['build-favicons']);
	gulp.watch(getFiles(config.images.single.files), ['build-images']);
});

function buildEnd() {
	console.log('_____________________________________________________');
	console.log('Выполнена очистка и сборка проекта');
	console.log('Запущена задача на отслеживание изменений в проекте');
}

function getFiles(files, dir) {
	if (dir === undefined) {
		dir = config.private;
	}
	var result;
	if (files instanceof Array) {
		result = [];
		files.forEach(function (item, i) {
			result[i] = dir + item;
		});
	}
	else {
		result = dir + files;
	}
	return result;
}
