var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
const assets      = require('mrs-smith-assets');

Metalsmith(__dirname)
.metadata({
  title: "auRuscha",
  description: "auRuscha's blog",
  generator: "Metalsmith",
  url: "https://auruscha.github.io/"
})
.source('src')
.destination('public')
.clean(false)
  .use(assets({
    source: 'assets',
    destination: '.'
  }))
.use(markdown())
.use(permalinks())
.use(layouts({
  directory: 'layouts',
  engine: 'handlebars'
}))
.build(function(err, files) {
  if (err) { throw err; }
  console.log('Done!');
});
