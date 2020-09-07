'use strict'

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  del = require('del'),
  usemin = require('gulp-usemin'),
  flatmap = require('gulp-flatmap'),
  uglify = require('gulp-uglify-es').default,
  rev = require('gulp-rev'),
  cleanCss = require('gulp-clean-css'),
  htmlmin = require('gulp-htmlmin')

gulp.task('sass', function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css/'))
})

gulp.task('watch:sass', function () {
  gulp.watch('./sass/*.scss', gulp.series('sass'))
})

gulp.task('browserSync', function () {
  var files = [
    './*.html',
    './css/*.css',
    './js/*.js',
    './img/*.{png,jpg,jpeg,gif}'
  ]
  browserSync.init(files, {
    server: {
      baseDir: './'
    }
  })
})

gulp.task('default', gulp.parallel('watch:sass', 'browserSync'))

gulp.task('clean', function () {
  return del(['dist'])
})

gulp.task('copyfonts', function () {
  return gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}')
    .pipe(gulp.dest('./dist/fonts'))
})

gulp.task('usemin', function () {
  return gulp.src('./*.html')
    .pipe(flatmap(function (stream, file) {
      return stream
        .pipe(usemin({
          css: [rev()],
          html: [function () { return htmlmin({ collapseWhitespace: true }) }],
          js: [uglify(), rev()],
          inlinejs: [uglify()],
          inlinecss: [cleanCss(), 'concat']
        }))
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('build', gulp.series('clean', gulp.parallel('copyfonts', 'usemin')))
