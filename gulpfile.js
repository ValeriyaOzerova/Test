"use-strict";
var gulp = require('gulp');
var connect = require('gulp-connect');
var opn = require('opn');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var cleancss = require('gulp-clean-css')

//local server
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true,
    port: 1234
  });
  opn('http://localhost:1234');
});
 //source
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});


 gulp.task('js', function () {
  gulp.src('./app/js/*.js')
    .pipe(connect.reload());
});
 
 
// sass to css and  convert CSS
gulp.task('convert-css', function() {
    return gulp.src('./app/css/main.scss')
      .pipe(sass())
      .pipe(autoprefixer({
            browsers: ["> 1%", 'last 15 versions', "ie 6"],
            cascade: false
        }))
      .pipe(rename('main.css'))
      .pipe(gulp.dest('./app/css/'))
      .pipe(connect.reload())
});

 //folowing
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']); 
  gulp.watch(['./app/js/*.js'], ['js']); 
  gulp.watch(['./app/css/*.scss'], ['convert-css']); 
});

gulp.task('build', function() {
  var buildCss = gulp.src([
    'app/css/main.css'
  ])
    .pipe(cleancss())
    .pipe(gulp.dest('dist/css'))

  var buildJs = gulp.src('app/js/**/*')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));

  var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

  var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));

   var builLibs = gulp.src('app/libs/**/*')
    .pipe(gulp.dest('dist/libs'));
});

 //task by default
gulp.task('default', ['connect', 'watch','convert-css']);

