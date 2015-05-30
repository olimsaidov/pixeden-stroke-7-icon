var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
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

gulp.task('clean', function(cb) {
  del([path.dist], cb);
});

gulp.task('sass', function() {
  return gulp.src(path.sass + '/' + fontName + '.scss')
  .pipe(plugins.plumber())
  .pipe(plugins.sass())
  .pipe(plugins.autoprefixer(
    [ 'last 15 versions', '> 1%', 'ie 8', 'ie 7' ],
    { cascade: true }
  ))
  .pipe(gulp.dest(path.dist));
});

gulp.task('minify-css', ['sass'], function() {
  return gulp.src(path.dist + '/' + fontName + '.css')
  .pipe(plugins.plumber())
  .pipe(plugins.rename({ suffix: '.min'} ))
  .pipe(plugins.minifyCss())
  .pipe(gulp.dest(path.dist));
});

gulp.task('build', ['sass', 'minify-css'], function() {

});

gulp.task('watch', function() {
  gulp.watch(
    [path.sass + '/*.scss'],
    ['sass']
  );
});

gulp.task('default', ['build'], function() {

});
