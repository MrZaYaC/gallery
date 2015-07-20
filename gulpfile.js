var gulp          = require('gulp');
var jade          = require('gulp-jade');
var uglify        = require('gulp-uglify');
var concat        = require('gulp-concat');
var ngAnnotate    = require('gulp-ng-annotate');
var minifyHTML    = require('gulp-minify-html');
var sourcemaps    = require('gulp-sourcemaps');
var imagemin      = require('gulp-imagemin');
var webserver     = require('gulp-webserver');
var less          = require('gulp-less');
var path          = require('path');
var bowerFiles    = require('main-bower-files');
var inject        = require('gulp-inject');
var ngConstant    = require('gulp-ng-constant');
var es            = require('event-stream');

dev_path = {
    jade: './src/jade/pages/**/*.jade',
    images: './src/img/**',
    js: './src/js/',
    less: './src/less/styles.less',
    i18n: './src/i18n/*.json',
    config: './src/config/dev.json'
  };

pub_path = {
  html: './public/',
  images: './public/img/',
  js: './public/js/',
  css: './public/css/',
  assets: './public/assets/',
  i18n: './public/i18n/',
  config: './src/config/prod.json'
};

gulp.task('jade', ['bower'], function(){
  gulp.src(dev_path.jade)
    .pipe(jade({pretty: true}))
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {
      name: 'bower',
      transform: function(filepath) {
        if (filepath.slice(-3) === '.js') {
          var tmp = filepath.split('/');
          var filename = tmp[tmp.length - 1];
          return '<script src="/assets/'+ filename + '"></script>';
        }
        if (filepath.slice(-4) === '.css') {
          var tmp = filepath.split('/');
          var filename = tmp[tmp.length - 1];
          return '<link rel="stylesheet" href="/assets/'+ filename + '">';
        }

        // Use the default transform as fallback:
        return inject.transform.apply(inject.transform, arguments);
      }
    }))
    .pipe(minifyHTML())
    .pipe(gulp.dest(pub_path.html))
});

gulp.task('images', function() {
  return gulp.src(dev_path.images)
    .pipe(imagemin())
    .pipe(gulp.dest(pub_path.images))
});

gulp.task('js_dev', function () {
  var config = gulp.src(dev_path.config)
    .pipe(ngConstant({name: 'app.config'}));

  var scripts = gulp.src(dev_path.js + '**/*.js');

  return es.merge(config, scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(pub_path.js))
});
gulp.task('js_pub', function () {
  var config = gulp.src(pub_path.config)
    .pipe(ngConstant({name: 'app.config'}));

  var scripts = gulp.src(dev_path.js + '**/*.js');

  return es.merge(config, scripts)
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest(pub_path.js))
});
gulp.task('bower', function (){
  return gulp.src(bowerFiles())
    .pipe(gulp.dest(pub_path.assets));
});

gulp.task('webserver', ['less', 'jade', 'images', 'js_dev', 'i18n'] , function() {
  gulp.src('public')
    .pipe(webserver({
      livereload: true,
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('less', function () {
  return gulp.src(dev_path.less)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(pub_path.css));
});

gulp.task('watch', ['webserver'], function () {
  gulp.watch('./src/img/**', ['images']);
  gulp.watch('./src/jade/**', ['jade']);
  gulp.watch('./bower_components/**', ['jade']);
  gulp.watch('./src/js/**', ['js_dev']);
  gulp.watch('./src/config/*.json', ['js_dev']);
  gulp.watch('./src/less/**', ['less']);
  gulp.watch('./src/i18n/**', ['i18n']);
});

gulp.task('i18n', function() {
  return gulp.src(dev_path.i18n)
    .pipe(gulp.dest(pub_path.i18n));
});

gulp.task('dev',['watch']);
gulp.task('pub',['less', 'jade', 'images', 'js_pub', 'i18n']);