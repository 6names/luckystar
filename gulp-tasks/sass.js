var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    mqpacker = require("css-mqpacker"),
    sortCSSmq = require('sort-css-media-queries'),
    postcss = require('gulp-postcss'),
    plumber = require('gulp-plumber');

module.exports = function (gulp, callback) {
    return gulp.src("./src/css/style.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([
            mqpacker({
                sort: sortCSSmq.desktopFirst
            })
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest("./src/css/"));
};