const gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    webpack = require('webpack-stream');

module.exports = function (gulp, callback) {
    return gulp.src('./src/js/index.js')
        .pipe(plumber())
        .pipe(webpack({
            devtool: 'source-map',
            output: {
                filename: 'app.js',
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['babel-preset-env']
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest('./src/js/'));
};