var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
const assets    = require('mrs-smith-assets');
const inlinesource = require('metalsmith-inline-source');

Metalsmith(__dirname)
.metadata({
  title: "auRuscha",
  description: "auRuscha's website",
  url: "https://auruscha.github.io/"
})
.source('src')
.destination('public')
.clean(true)
.use(assets({
  source: 'assets',
  destination: '.'
}))
.use(markdown())
.use(permalinks({
  pattern: ':title'
}))
.use(layouts({
  directory: 'layouts',
  engine: 'handlebars'
}))
.use(inlinesource({
  compress: false
}))
.build(function(err, files) {
  if (err) { throw err; }
  console.log('Done!');
});
