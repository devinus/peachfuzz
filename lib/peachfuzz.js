'use strict';

var TRIM_RE = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
var PEACHFUZZ_RE = /\{\{(.*)\}\}/g;

var trim = String.prototype.trim || function trim() {
  return this.replace(TRIM_RE, '');
};

function peachfuzz(template, context, transform) {
  context = context || {};

  return template.replace(PEACHFUZZ_RE, function replacer(match, name) {
    var key = trim.call(name);
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
