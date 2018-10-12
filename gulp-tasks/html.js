var fileinclude = require('gulp-file-include'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber');


var fileincludeTemplate = function (name, file, destination) {
    gulp.task(name, function () {
        gulp.src([file])
            .pipe(plumber())
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file',
                indent: true
            }))
            .pipe(gulp.dest(destination));
    });
};

// Index
fileincludeTemplate('fileIndex', './src/html/*.html', './src/');