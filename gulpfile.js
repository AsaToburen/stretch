var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    browserSync = require('browser-sync').create(),
    sourcemaps = require('gulp-sourcemaps'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    usemin = require('gulp-usemin'),
    cache = require('gulp-cache'),
    rev = require('gulp-rev'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    minifyCss = require('gulp-minify-css'),
    del = require('del');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/scss/**/*.scss", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});


gulp.task('copy-html-files', function() {
    gulp.src(['./src/**/*.html', './src/**/**/*.html', '!./src/index.html'], {
            base: './src'
        })
        .pipe(gulp.dest('dist/'));
});

gulp.task('images', function() {
    gulp.src('./src/images/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('usemin', function() {
    gulp.src('./src/index.html')
        .pipe(usemin({
            html: [minifyHtml({
                empty: true
            })],
            css: [autoprefixer('last 2 versions'), minifyCss(), 'concat', rev()],
            vendorCss: [rev()],
            vendor: [rev()],
            js: [uglify().on('error', function(e) {
                    console.log('\x07', e.message);
                    return this.end();
                }),
                rev()
            ]
        }))
        .pipe(gulp.dest('dist/'));
});

/**
 * Compile with gulp-ruby-sass + source maps
 */
gulp.task('sass', function() {

    return sass('./src/scss', {
            sourcemap: true
        })
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write('./', {
            includeContent: false,
            sourceRoot: './src/scss'
        }))
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.stream({
            match: './src/css/*.css'
        }));
});


gulp.task('clean:dist', function(cb) {
    del('./dist', cb);
});

gulp.task('default', function() {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/images/*', ['images']);
});

gulp.task('clean', ['clean:dist']);

gulp.task('build', ['copy-html-files', 'images', 'usemin']);
