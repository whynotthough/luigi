axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
# collections  = require 'roots-collections'
contentful   = require 'roots-contentful'
config       = require './contentful'
marked       = require 'marked'
slugify      = require 'slugify'

module.exports =
  ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']

  extensions: [
  	# collections(folder: 'products', layout: 'product'),
  	contentful(config),
    js_pipeline(files: 'assets/js/*.+(coffee|js)', out: 'js/build.js', minify: true, hash: true),
    css_pipeline(files: 'assets/css/*.+(styl|css)', out: 'css/build.css', minify: true, hash: true)
  ]

  stylus:
    use: [axis(), rupture(), autoprefixer()]

	locals:
    markdown: marked
    slugme: slugify