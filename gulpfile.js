var gulp = require('gulp');

gulp.task('postcss', ['sass'], function() {
    var postcss      = require('gulp-postcss');
    var autoprefixer = require('autoprefixer');

    return gulp.src('./public/assets/css/*.css')
        .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(gulp.dest('./public/assets/css'));
});

gulp.task('clean', function() {
  var del = require('del');
  return del([
    './public/assets/css/*',
  ]);
});

gulp.task('sass', ['clean'], function() {
  var sass = require('gulp-sass');
  return gulp.src('./src/css/*.scss')
    .pipe( sass().on('error', sass.logError) )
    .pipe( gulp.dest('./public/assets/css/') );
});

gulp.task('default', ['postcss']);

gulp.task('watch', function() {
  gulp.watch('./src/css/*.scss', ['default']);
});