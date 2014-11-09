var jshint = require('gulp-jshint');
var gulp   = require('gulp');

gulp.task('default', ['lint'], function() {
    return;
});

gulp.task('lint', function() {
  return gulp.src('./app/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
