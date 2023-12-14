const { getURLsFromHTML, normalizeURL } = require('./crawl.js');
const { test, expect } = require('@jest/globals');

// getURLsFromHTML
test('getURLsfromHTML absolute URLs', () => {
  const inputHTMLBody = `
<html>
  <body>
    <a href="https://blog.boot.dev/path/">
      Boot.dev Blog
    </a>
  </body>
</html>
  `;
  const inputBaseURL = 'https://blog.boot.dev/path/';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ['https://blog.boot.dev/path/'];
  expect(actual).toEqual(expected);
});

test('getURLsfromHTML relative URLs', () => {
  const inputHTMLBody = `
<html>
  <body>
    <a href="/path/">
      Boot.dev Blog
    </a>
  </body>
</html>
  `;
  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ['https://blog.boot.dev/path/'];
  expect(actual).toEqual(expected);
});

test('getURLsfromHTML both relative and absolute URLs', () => {
  const inputHTMLBody = `
<html>
  <body>
    <a href="https://blog.boot.dev/path1/">
      Boot.dev Blog Path One
    </a>
    <a href="/path2/">
      Boot.dev Blog Path Two
    </a>
  </body>
</html>
  `;
  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [
    'https://blog.boot.dev/path1/',
    'https://blog.boot.dev/path2/',
  ];
  expect(actual).toEqual(expected);
});

test('getURLsfromHTML invalid', () => {
  const inputHTMLBody = `
<html>
  <body>
    <a href="invalid">
      Invalid URL
    </a>
  </body>
</html>
  `;
  const inputBaseURL = 'https://blog.boot.dev';
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});

// normalizeURL
test('normalizeURL strip protocol', () => {
  const input = 'https://blog.boot.dev/path';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL strip trailing slash', () => {
  const input = 'https://blog.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL capitals', () => {
  const input = 'https://BLOG.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});

test('normalizeURL strip http', () => {
  const input = 'http://blog.boot.dev/path/';
  const actual = normalizeURL(input);
  const expected = 'blog.boot.dev/path';
  expect(actual).toEqual(expected);
});
