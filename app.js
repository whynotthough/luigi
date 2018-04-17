const Contentful = require('spike-contentful')

const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const sugarml = require('sugarml')
const sugarss = require('sugarss')
const env = process.env.NODE_ENV

const slugify = require('slugify')
const locals = {}

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
            path: 'views/product.sgr',
            output: (e) => `products/${e.fields.productUrl}.html`
          }
        },
        {
          name: 'productsIT',
          id: 'product',
          template: {
            path: 'views/it/product.sgr',
            output: (e) => `it/products/${e.fields.productUrl}.html`
          }
        },
        {
          name: 'textPages',
          id: 'textPage',
          template: {
            path: 'views/textpage.sgr',
            output: (e) => `${e.fields.footerUrl}.html`
          }
        },
        {
          name: 'textPagesIT',
          id: 'textPage',
          template: {
            path: 'views/it/textpage.sgr',
            output: (e) => `it/${e.fields.footerUrl}.html`
          }
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
  ignore: ['**/_*/*', '**/layout.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock', 'package-lock.json', 'netlify.toml'],
  reshape: htmlStandards({
    parser: sugarml,
    locals: (ctx) => Object.assign(locals, {
      pageId: pageId(ctx),
      slugme: slugify,
      oo: 'bar', env,
      clearUndef: (e = '') => e
    }),
    minify: env === 'production'
  }),
  postcss: cssStandards({
    parser: sugarss,
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  babel: jsStandards()
}
