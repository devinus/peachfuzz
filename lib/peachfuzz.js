'use strict';

var PEACHFUZZ_RE = /\{\{\s*(.+?)\s*\}\}/g;

function peachfuzz(template, context, transform) {
  context = context || {};

  return template.replace(PEACHFUZZ_RE, function replacer(match, key) {
    var value;

    if (context.hasOwnProperty(key)) {
      value = context[key];
    }

    if (typeof transform === 'function') {
      value = transform.call(transform, value);
    }

    /* jshint eqnull:true */
    return value == null ? '' : value;
  });
}

module.exports = peachfuzz;
