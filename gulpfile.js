 var gulp = require('gulp'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    del = require('del'),
    concat = require('gulp-concat'),
    minify = require('gulp-minifier'),
    livereload = require('gulp-livereload');
gulp.task('scripts', function() {
    gulp.src([
      'client/src/js/libs/angular.min.js',
      'client/src/js/libs/tether.min.js',
      'client/src/js/libs/*.js',
      'client/src/js/app.js',
      'client/src/js/routes.js',
      'client/src/js/directives/*.js',
      'client/src/js/factories/*.js',
      'client/src/js/controllers/*.js'
    ])
      .pipe(concat('scripts.js'))
      .pipe(minify({
        minify: false,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyJS: true}))
      .pipe(gulp.dest('client/dist/js'));
});
gulp.task('sass', function() {
  return gulp.src(['client/src/sass/base.scss','client/src/sass/*.scss'])
      .pipe(concat('app.scss'))
      .pipe(sass())
      .pipe(gulp.dest('client/src/css/'));

});
gulp.task('styles', function() {
  return gulp.src([
          'client/src/css/libs/*.css',
          'client/src/css/app.css'])
      .pipe(concat('styles.css'))
      .pipe(gulp.dest('client/dist/css/'));

});


gulp.task('watch', function() {


  // Watch .js files
  gulp.watch('client/src/js/**/*.js', ['scripts']);
  gulp.watch('client/src/sass/**/*.scss', ['sass']);
  gulp.watch('client/src/css/app.css', ['styles']);
  gulp.watch('client/dist/**', ['livereload']);





});
gulp.task('livereload',function(){
  livereload.changed('http://localhost:3000/#!/');
  livereload.reload();
})
gulp.task('default',['scripts','sass','styles','watch','livereload']);
