// TODO:构建样式
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const packageJSON = require('../package.json');
const configLess = {
  // common样式文件入口
  common: '../src/styles/common/index.less',
  // 全量样式文件入口
  all: '../src/styles/export/index.less',
  // less编译插件
  plugin: [
    autoprefixer({
      browsers: packageJSON.browsers
    })
  ]
};
/**
 * 拷贝图标字体
*/
function copyFiles () {
  return gulp
    .src(['../src/styles/fonts/**/*'])
    .pipe(gulp.dest('../dist/fonts/'));
}
/**
 *拷贝图片
*/
function copyImage () {
  return gulp
    .src(['../src/images/*.*'])
    .pipe(gulp.dest('../dist/images/'));
}
/**
 * 构建核心样式
*/
function buildCommon () {
  return gulp.src(['../src/styles/index.less'])
    .pipe(less({
      plugins: configLess.plugin
    }))
    .pipe(cleanCSS())
    .pipe(rename(function (options) {
      options.basename = 'index';
      options.extname = '.css';
    }))
    .pipe(gulp.dest('../dist/emui/'));
}
function watch () {
  gulp.watch([
    '../src/**/*.less'
  ], gulp.parallel('default'));
}
gulp.task('default', gulp.parallel(buildCommon, copyFiles, copyImage));
gulp.task('watch', gulp.series('default', watch));
