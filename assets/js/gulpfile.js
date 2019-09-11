var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint=require('gulp-jshint');

    gulp.task('minifycss', function() {
        return gulp.src('*.css')  
            .pipe(rename({suffix: '.min'}))  
            .pipe(minifycss())
            .pipe(gulp.dest('Css')); 
    })；

    gulp.task('default', [], function() {
        gulp.start('minifycss'); 
　　});