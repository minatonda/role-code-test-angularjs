'use strict';

var path = require('path');
var gulp = require('gulp');
var gulpInject = require('gulp-inject');

var bowerFiles = require('main-bower-files');
var es = require('event-stream');

var config = {
  appjs: [
    "./src/app/index.module.js",
    "./src/app/index.config.js",
    "./src/app/index.constants.js",
    "./src/app/**/*.module.js",
    "./src/app/**/*.config.js",
    "./src/app/**/*.service.js",
    "./src/app/**/*.factory.js",
    "./src/app/**/*.js",
    "!./src/app/**/*.fake.js",
    "!./src/app/**/*.spec.js",
  ],
  specjs: [
    "./src/app/**/*.fake.js",
    "./src/app/common/testUtils/*",
    "./src/app/**/*.spec.js",
    "./tests/**/*.spec.js"
  ],
  tplhtml: [
    "./src/app/**/*.tpl.html",
  ],
};

gulp.task("inject-js-karma-conf", function () {
  return gulp
    .src("./karma.conf.js")
    .pipe(gulpInject(gulp.src(config.appjs), {
      starttag: "// inject:js",
      endtag: "// endinject",
      transform: function (filepath, file, i, length) {
        return "\"" + filepath.substr(1) + "\",";
      }
    }))
    .pipe(gulpInject(gulp.src(config.specjs), {
      starttag: "// spec:js",
      endtag: "// endinject",
      transform: function (filepath, file, i, length) {
        return "\"" + filepath.substr(1) + "\",";
      }
    }))
    .pipe(gulpInject(gulp.src(bowerFiles()), {
      starttag: '// bower:js',
      endtag: '// endinject',
      transform: function (filepath, file, i, length) {
        return "\"" + filepath.substr(1) + "\",";
      }
    }))
    .pipe(gulpInject(gulp.src(config.tplhtml), {
      starttag: '// tpl:html',
      endtag: '// endinject',
      transform: function (filepath, file, i, length) {
        return "\"" + filepath.substr(1) + "\":\"html2js\",";
      }
    }))
    .pipe(gulp.dest("./"));
});
