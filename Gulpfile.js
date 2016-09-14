"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var bourbon = require("node-bourbon").includePaths;
var neat = require("node-neat").includePaths;
var browserSync = require('browser-sync').create();
var postcss = require('gulp-postcss');

// Compile SASS into CSS & auto-inject into browsers
gulp.task('sass', function() {
    gulp.src('src/scss/**/*.scss')
      .pipe(sass(
      {
        includePaths: bourbon,
        includePaths: neat,
        errLogToConsole: true
      }))
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.stream());
});

// PostCSS Task(s)
var plugins = [
    require('autoprefixer')({ browsers: ['last 2 versions', 'ie 6-8', 'Firefox > 20']})
];

gulp.task('style', function () {
    return gulp.src('src/css/style.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('dist/css/'))
});

// Static Server + Watch SCSS/HTML files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);



