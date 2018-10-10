const fileinclude = require('gulp-file-include'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber');


const fileincludeTemplate = (name, file, destination) => {
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
fileincludeTemplate('fileIndex', './src/html/index.html', './src/');