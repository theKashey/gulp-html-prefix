# gulp-html-prefix [![Build Status](https://travis-ci.org/thekashey/gulp-html-prefix.svg?branch=master)](https://travis-ci.org/thekashey/gulp-html-prefix)

Gulp plugin to prefix classes in a HTML file.

## Installation

```
npm install --save gulp-html-prefix
```

## Usage

```js
var gulp        = require('gulp'),
    classPrefix = require('gulp-html-prefix');

gulp.task('prefix', function() {
  return gulp.src('my-file.html')
    .pipe(classPrefix('my-class-prefix-'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['prefix']);
```

### Using the `ignored` option:

```js
var gulp        = require('gulp'),
    classPrefix = require('gulp-class-prefix');

gulp.task('prefix', function() {
  return gulp.src('my-file.html')
  .pipe(classPrefix('my-class-prefix-', { ignored: [/\ng-/, 'some-class'] }))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', ['prefix']);
```

## License

MIT