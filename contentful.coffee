module.exports = 
  access_token: 'eb6d896c25cd46f3fa4a4f72a4307fdfaf63cca840ad7624d8218054d5310b33'
  management_token: ''
  space_id: 'qyijm2cbwnd5'
  content_types:                  # remove these object braces once the config below is filled out
    products:                          # data will be made available through this key on the `contentful` object in your templates
      id: 'product'                    # ID of your content type
      template: 'views/_product.jade'  # if present a single page view will be created for each entry in the content type
	    # path: (entry) -> "blog/#{entry.permalink}"
      # filters: {}                   # passes filters to the call to contentful's API, see contentful's docs for more info
	    # path: (e) -> "products/#{slugify(e.title)}"
      # path: (entry) ->              # override function for generating single page file path, passed in the entry object
    textPages:
      id: 'textPage'
    contactPage:
      id: 'contactsPage'
    headBanner:
      id: 'headBanner'