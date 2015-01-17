const del = require('del');
const gulp = require('gulp');
const to5 = require('gulp-6to5');
const mocha = require('gulp-mocha');
const jshint = require('gulp-jshint');
const rename = require('gulp-rename');
const filter = require('gulp-filter');
const uglify = require('gulp-uglifyjs');
const template = require('gulp-template');
const preprocess = require('gulp-preprocess');
const sourcemaps = require('gulp-sourcemaps');

// Adjust this file to configure the build
const mainConfig = require('./config/main-config');

// Remove the built files
gulp.task('clean', function(cb) {
  del([mainConfig.distFolder], cb);
});

gulp.task('lint', function() {
  return gulp.src(['src/**/*.js', '!src/wrapper.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Build two versions of the library
gulp.task('build', ['lint', 'clean'], function() {
  return gulp.src('src/wrapper.js')
    .pipe(template(mainConfig))
    .pipe(preprocess())
    .pipe(rename(mainConfig.fileName + '.js'))
    .pipe(sourcemaps.init())
    .pipe(to5({blacklist: ['useStrict'], modules: 'ignore'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(mainConfig.distFolder))
    .pipe(filter(['*', '!**/*.js.map']))
    .pipe(rename(mainConfig.fileName + '.min.js'))
    .pipe(uglify(require('./config/build/uglify-config.js')))
    .pipe(gulp.dest(mainConfig.distFolder));
});

// Run our tests
gulp.task('test', ['lint'], function() {
  return gulp.src(['test/setup/helpers.js', 'test/unit/**/*.js'], {read: false})
    .pipe(mocha({reporter: 'dot'}));
});

// An alias of test
gulp.task('default', ['test']);
