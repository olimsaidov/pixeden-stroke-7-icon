var gulp = require('gulp');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var path = {
  assets: 'pe-icon-7-stroke',
  get sass() {
    return this.assets + '/scss'
  },
  get css() {
    return this.assets + '/css'
  },
  get dist() {
    return this.assets + '/dist'
  }
};
var fontName = 'pe-icon-7-stroke';

gulp.task('sass', function() {
  return gulp.src(path.sass + '/' + fontName + '.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(gulp.dest(path.dist));
});

gulp.task('minify-css', function() {
  return gulp.src(path.dist + '/' + fontName + '.css')
  .pipe(plumber())
  .pipe(rename({ suffix: '.min'} ))
  .pipe(minifycss())
  .pipe(gulp.dest(path.dist));
});

gulp.task('watch', function() {
  gulp.watch(
    [path.sass + '/*.scss'],
    ['sass']
  );
});

gulp.task('default', function() {

});
