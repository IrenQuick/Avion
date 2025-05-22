import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';

import htmlmin from 'gulp-htmlmin';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import { deleteAsync } from 'del';

// Styles
export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
};

// HTML
const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
};

// CSS для продакшна
const stylesBuild = () => {
  return gulp.src('source/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/css'));
};

// JS (если будет)
const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'));
};

// Очистка
const clean = () => {
  return deleteAsync ('build');
};

// Копирование других файлов (например, изображений, шрифтов)
const copy = () => {
  return gulp.src([
    'source/fonts/**/*',
    'source/img/**/*',
    'source/*.ico'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'));
};

// Сервер
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Вотчер
const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
};

// Сборка
export const build = gulp.series(
  clean,
  styles,
  gulp.parallel(html, stylesBuild, scripts, copy)
);

// По умолчанию (dev)
export default gulp.series(
  styles, server, watcher
);
