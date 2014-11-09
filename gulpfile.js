var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var svgmin = require('gulp-svgmin');
var sequence = require('run-sequence');
var nodemon = require('gulp-nodemon')
var del   = require('del');

/*
 * Top-level commands
 */
gulp.task('build', function(callback) {
    sequence(
        'lint',
        'test',
        ['copydeps', 'buildjs', 'buildcss', 'buildhtml', 'buildimg'],
        callback
    )
});

gulp.task('serve', ['build'], function() {
    //start the server at the beginning of the task
    nodemon({
        script: 'app/main.js',
        ignore: ['^(app)']
    })
    // watch for changes to the source
    gulp.watch('./public/sass/*.scss', ['buildcss']);
    gulp.watch('./public/js/*.js', ['buildjs']);
    gulp.watch('./public/img/*', ['buildimg']);
    gulp.watch('./views/*.html', ['buildhtml']);
});

gulp.task('clean', function(callback) {
    del(['build'], callback);
});

/*
 * Linting and testing
 */
gulp.task('lint', function() {
    gulp.src('./app/*.js', './public/js/*.js', 'gulpfile.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function(callback) {
    sequence(
        'testserver',
        'testclient',
        callback
    );
});

gulp.task('testclient', function() {
    // TODO
});

gulp.task('testserver', function() {
    // TODO
});

/*
 * Building
 */
gulp.task('copydeps', function() {
    // copy angular
    gulp.src(
        './bower_components/angular/angular.js',
        './bower_components/angular/angular.min.js',
        './bower_components/angular/angular.min.js.map')
            .pipe(gulp.dest('build/assets/js'));
    // copy restangular
    gulp.src(
        './bower_components/restangular/dist/restangular.js',
        './bower_components/restangular/dist/restangular.min.js')
            .pipe(gulp.dest('build/assets/js'));
    // copy famous
    gulp.src(
        './bower_components/famous/dist/famous-global.js',
        './bower_components/famous/dist/famous-global.min.js')
            .pipe(gulp.dest('build/assets/js'));
    gulp.src(
        './bower_components/famous/dist/famous.css')
            .pipe(cssmin())
            .pipe(gulp.dest('build/assets/css'));
    // copy famous-angular
    gulp.src(
        './bower_components/famous/dist/famous-angular.js',
        './bower_components/famous/dist/famous-angular.min.js')
            .pipe(gulp.dest('build/assets/js'));
    gulp.src(
        './bower_components/famous/dist/famous-angular.css')
            .pipe(cssmin())
            .pipe(gulp.dest('build/assets/css'));
    // copy lodash
    gulp.src(
        './bower_components/lodash/dist/lodash.js',
        './bower_components/lodash/dist/lodash.min.js')
            .pipe(gulp.dest('build/assets/js'));
    // copy angular-facebook
    gulp.src(
        './bower_components/angular-facebook/lib/angular-facebook.js')
            .pipe(gulp.dest('build/assets/js'))
            .pipe(uglify({mangle: false}))
            .pipe(rename('angular-facebook.min.js'))
            .pipe(gulp.dest('build/assets/js'));
});

gulp.task('buildcss', function() {
    // compile and minify sass
    gulp.src('./public/sass/*.scss')
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest('build/assets/css'));
});

gulp.task('buildhtml', function() {
    // copy and minify html
    gulp.src('./views/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build'));
});

gulp.task('buildimg', function() {
    // copy and minify svgs
    gulp.src('./public/img/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('build/assets/img'));
    // copy over other images
    gulp.src('./public/img/!(*.svg)')
        .pipe(gulp.dest('build/assets/img'));
});

gulp.task('buildjs', function() {
    // copy and minify svgs
    gulp.src('./public/js/*.js')
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('build/assets/js'));
});
