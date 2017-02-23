var os = require('os');
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('sass', function(done) {
  gulp.src('./scss/style.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./app/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./app/css/'))
    .on('end', done);
});

gulp.task('sass-watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 8080
  });
});
 
gulp.task('assets', function () {
  gulp.src(['./app/**/*.{html,js}', './app/css/**/*.css', './app/img/**/*.{jpg,jpeg,gif,png}'])
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['./app/**/*.{html,js}', './app/css/**/*.css', './app/img/**/*.{jpg,jpeg,gif,png}'], ['assets']);
});

gulp.task('open', function(){
  gulp.src('./app/index.html')
  .pipe(open({uri: 'http://localhost:8080'}));
});
 
gulp.task('default', ['connect', 'watch', 'sass', 'sass-watch', 'open']);