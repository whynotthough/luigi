axis         = require 'axis'
rupture      = require 'rupture'
autoprefixer = require 'autoprefixer-stylus'
js_pipeline  = require 'js-pipeline'
css_pipeline = require 'css-pipeline'
contentful   = require 'roots-contentful'
config       = require './contentful'
marked       = require 'marked'
slugify      = require 'slugify'


module.exports =
  ignores: ['readme.md', '**/layout.*', '**/_*', '.gitignore', 'ship.*conf']

  extensions: [
    contentful(config),

    # STAGING GONFIG
    # js_pipeline(files: 'assets/js/*.+(coffee|js)', out: '/js/main.js'),
    # css_pipeline(files: 'assets/css/*.+(styl|css)', out: '/css/master.css')

    # PRODUCTION CONFIG
    js_pipeline(files: 'assets/js/*.+(coffee|js)', out: '/js/build.js', minify: true),
    css_pipeline(files: 'assets/css/*.+(styl|css)', out: '/css/build.css', minify: true)
  ]

  stylus:
    use: [axis(), rupture(), autoprefixer()]
  #   sourcemap: true  # comment this for production
  # 'coffee-script':   # comment this for production
  #   sourcemap: true  # comment this for production
  # jade:              # comment this for production
  #   pretty: true     # comment this for production

  locals:
    markdown: marked
    slugme: slugify