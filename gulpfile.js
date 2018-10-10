const gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    run = require('run-sequence');

// Serve
gulp.task('serve', function (fn) {
    run('fileIndex', 'sass', 'js', 'svgstore', fn);
    browserSync.init({
        server: "./src/",
        notify: false
    });
    
    // Index
    gulp.watch('./src/html/index.html', ['fileIndex']);
    gulp.watch('./src/html/components/*.html', ['fileIndex']);
    
    // HTML Reload
    gulp.watch('./src/contents/*.html').on('change', browserSync.reload);
    gulp.watch(['./src/index.html']).on('change', browserSync.reload);
    
    // Modals
    gulp.watch('./src/modals/*.html').on('change', browserSync.reload);
    
    // js
    gulp.watch(['./src/js/**/*.js', '!./src/js/app.js'], ['js']);
    gulp.watch(['./src/js/app.js']).on('change', browserSync.reload);
    
    // css
    gulp.watch('./src/css/**/*.scss', ['sass']);
    gulp.watch('./src/css/style.css').on('change', browserSync.reload);
    
    // svg
    gulp.watch('./src/images/svg/*.svg', ['svgstore']);
    gulp.watch('./src/images/ui/ui-icons.svg').on('change', browserSync.reload);
    
    // json
    gulp.watch('./src/db/*.json').on('change', browserSync.reload);
});

// Import of all tasks
const gulpRequireTasks = require('gulp-require-tasks');
gulpRequireTasks();

// Default
gulp.task('default', ['serve']);