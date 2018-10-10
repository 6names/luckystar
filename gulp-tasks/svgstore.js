const gulp = require('gulp'),
    svgmin = require('gulp-svgmin'),
    svgstore = require('gulp-svgstore'),
    path = require('path'),
    rename = require("gulp-rename");

module.exports = function (gulp, callback) {
    return gulp
        .src('./src/images/svg/*.svg', {base: 'src/svg'})
        .pipe(rename({prefix: 'icon-'}))
        .pipe(svgmin(function (file) {
            const prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(rename('ui-icons.svg'))
        .pipe(gulp.dest('./src/images/ui/'));
};