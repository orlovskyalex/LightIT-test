'use strict';

var gulp = require('gulp'),
	csscomb = require('gulp-csscomb');

gulp.task('default', function () {
	gulp.watch('./assets/css/less/main.less', ['csscomb']);
});

gulp.task('csscomb', function () {
	return gulp.src('./assets/css/less/main.less')
	           .pipe(csscomb())
	           .pipe(gulp.dest('./assets/css/less/'));
});
