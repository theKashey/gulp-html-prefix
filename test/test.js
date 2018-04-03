'use strict';

var assert = require('assert');
var classPrefix = require('..');
var gutil = require('gulp-util');

describe('gulp-html-prefix', function() {

  it('should prefix classNames', function(done) {
    var classPrefixStream = classPrefix('prfx-', { ignored: [/ng-/] });

    var actual = '<a class="some-class"><b class="another class ng-test"></b></a>';
    var expected = '<a class="prfx-some-class"><b class="prfx-another prfx-class ng-test"></b></a>';

    classPrefixStream.once('data', function(file) {
      assert.equal(file.relative, 'default.html');
      assert.equal(withoutSourceMap(file.contents.toString()), expected);
    });

    classPrefixStream.on('end', done);

    classPrefixStream.write(new gutil.File({
      path: 'default.html',
      contents: new Buffer(actual)
    }));

    classPrefixStream.end();
  });
});

function withoutSourceMap(str) {
  return (str || '').split('/*# sourceMappingURL')[0];
}
