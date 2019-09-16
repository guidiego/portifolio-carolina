const { src, dest, parallel } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const yaml = require('yaml');
const fs = require('fs');

function html() {
  const basePath = './content';
  const files = fs.readdirSync(basePath);
  const portifolio = [];

  files.forEach((file) => {
    const text = fs.readFileSync(`${basePath}/${file}`, 'utf-8');
    portifolio.push(yaml.parse(text));
  });

  return src('src/index.pug')
    .pipe(pug({ data: { portifolio }}))
    .pipe(dest('build'))
}

function css() {
  return src('src/sass/index.sass')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest('build/assets/css'))
}

function js() {
  return src('src/scripts/index.js', { sourcemaps: true })
    .pipe(dest('build/assets/scripts', { sourcemaps: true }))
}

exports.js = js;
exports.css = css;
exports.html = html;
exports.default = parallel(html, css, js);