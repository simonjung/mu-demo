'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const clean = require('del');

/**
 * Watches for changes in client folder and updates
 * the pubic folder
 */
gulp.task('watch', () => {
  gulp.watch('client/index.html', ['copy:html']);
  gulp.watch('client/styles/**/*.less', ['build:less']);
  gulp.watch('client/assets/**/*', ['copy:assets']);
});

/**
 * Build less stylesheets into css and bundle
 * them into public folder
 */
gulp.task('build:less', () => {
  const dest = gulp.dest('server/public/css');

  return gulp.src('client/styles/bundle.less')
    .pipe(less())
    .pipe(dest);
});

/**
 * Copy asset files to public folder
 */
gulp.task('copy:assets', () => {
  const dest = gulp.dest('server/public/assets/');

  return gulp.src('client/assets/**/*')
    .pipe(dest);
});

/**
 * Copy html files to public folder
 */
gulp.task('copy:html', () => {
  const dest = gulp.dest('server/public/');

  return gulp.src('client/index.html')
    .pipe(dest);
});

/**
 * Delete all files in public server
 */
gulp.task('clean', () => {
  return clean.sync(['server/public/**/*']);
});

gulp.task('copy', ['copy:html', 'copy:assets']);
gulp.task('build', ['build:less']);
gulp.task('default', ['clean', 'build', 'copy']);
