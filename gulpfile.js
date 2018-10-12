var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    run = require('run-sequence');

// Serve
gulp.task('serve', function (fn) {
    run('fileIndex', 'sass', 'svgstore', fn);
    browserSync.init({
        server: "./src/",
        notify: false
    });
    
    // HTML
    gulp.watch('./src/html/*.html', ['fileIndex']);
    
    // HTML Reload
    gulp.watch(['./src/*.html']).on('change', browserSync.reload);
    
    // JS
    gulp.watch(['./src/js/main.js']).on('change', browserSync.reload);
    
    // CSS
    gulp.watch('./src/css/**/*.scss', ['sass']);
    gulp.watch('./src/css/style.css').on('change', browserSync.reload);
    
    // SVG
    gulp.watch('./src/images/svg/*.svg', ['svgstore']);
});

// Import of all tasks
var gulpRequireTasks = require('gulp-require-tasks');
gulpRequireTasks();

// Default
gulp.task('default', ['serve']);