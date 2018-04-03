var through = require('through2');

const isIgnored = (replace, ignores) =>
  ignores.find(
    ignore => replace.match(ignore)
  );

const classReplace = (classNames, prefix, ignores) =>
  classNames.replace(
    /(?:class|className)=(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]/i,
    (replaces, classNames) => {
      return 'class="' +
        classNames
          .split(' ')
          .map(replace => isIgnored(replace, ignores) ? replace : (prefix + replace))
          .join(' ')
        + '"'
    }
  );

module.exports = function (prefix, options) {
  options = options || {};

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (!file.isBuffer()) {
      cb();
    }

    var src = file.contents.toString();

    var allClasses = src.replace(
      /(?:class|className)=(?:["']\W+\s*(?:\w+)\()?["']([^'"]+)['"]/gi,
      replace => classReplace(replace, prefix, options.ignored || [])
    );


    file.contents = new Buffer(allClasses);
    cb(null, file);
  });
};
