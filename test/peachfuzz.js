'use strict';

var expect = require('chai').expect;

var peachfuzz = require('../');

describe('peachfuzz', function() {
  var template;
  var rendered;

  it('replaces vars', function() {
    template = 'Hello {{name}}';
    rendered = peachfuzz(template, { name: 'Devin' });
    expect(rendered).to.equal('Hello Devin');
  });

  it('replaces vars surrounded by whitespace', function() {
    template = 'Hello {{ name }}';
    rendered = peachfuzz(template, { name: 'Devin' });
    expect(rendered).to.equal('Hello Devin');
  });

  it('replaces dasherized vars', function() {
    template = 'Hello {{full-name}}';
    rendered = peachfuzz(template, { 'full-name': 'Devin Torres' });
    expect(rendered).to.equal('Hello Devin Torres');
  });

  it('replaces multiline template', function() {
    template = 'Hello {{name}}\n\nThe year is {{year}}';

    rendered = peachfuzz(template, {
      name: 'Devin',
      year: 2015
    });

    expect(rendered).to.equal('Hello Devin\n\nThe year is 2015');
  });

  it('replaces undefined vars with an empty string', function() {
    template = 'Hello {{name}}!';
    rendered = peachfuzz(template);
    expect(rendered).to.equal('Hello !');
  });

  it('replaces vars with a value transform', function() {
    template = 'https://swag.shop/?product={{product}}';
    rendered = peachfuzz(template, { product: 'Moustache Wax' }, encodeURIComponent);
    expect(rendered).to.equal('https://swag.shop/?product=Moustache%20Wax');
  });
});
