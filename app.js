const Contentful = require('spike-contentful')
const slugify = require('slugify')
const locals = {
  // pageId: pageId(ctx),
  foo: 'bar',
  slugme: slugify
}

const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const env = process.env.NODE_ENV


module.exports = {

  plugins: [
    new Contentful({
      addDataTo: locals,
      accessToken: 'eb6d896c25cd46f3fa4a4f72a4307fdfaf63cca840ad7624d8218054d5310b33',
      spaceId: 'qyijm2cbwnd5',
      contentTypes: [
        {
          name: 'products',
          id: 'product',
          template: {
            path: 'views/_product.sgr',
            output: (e) => { return `${e.id}.html` }
          }
        },
        {
          name: 'textPages',
          id: 'textPage',
        },
        {
          name: 'contactPage',
          id: 'contactsPage',
        },
        {
          name: 'headBanner',
          id: 'headBanner',
        }
      ]
    })
  ],

  devtool: 'source-map',
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.sss' },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock'],

  // ORIGINAL SPIKE DEFAULT TEMPLATE VERSION
  // reshape: htmlStandards({
  //   locals: (ctx) => { return { pageId: pageId(ctx), foo: 'bar' } },
  //   minify: env === 'production'
  // }),

  // VERSION FROM https://github.com/static-dev/spike-contentful
  // reshape: (ctx) => {
  //   return htmlStandards({
  //     locals
  //   })
  // },

// MY VERSION 2
  // reshape: (ctx) => {
  //   return htmlStandards({
  //     locals
  //   })
  // },

  // MY VERSION 1
   reshape: htmlStandards({
    locals,
    minify: env === 'production'
  }),



  postcss: cssStandards({
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  babel: jsStandards()
}

