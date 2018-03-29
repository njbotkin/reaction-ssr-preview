import { Meteor } from "meteor/meteor"
import { onPageLoad } from "meteor/server-render"
import { Hooks, Reaction } from "/server/api"
import { Packages } from "/lib/collections"

const prerender = require('prerender')
const { promisify } = require('util')
const request = promisify(require('request'))
const cacheManager = require('cache-manager')
const cheerio = require('cheerio')

import injectHead from './inject-head'
import injectBody from './inject-body'

Hooks.Events.add("afterCoreInit", () => {

	const { settings } = Packages.findOne({ name: "reaction-ssr-preview" })

	const server = prerender({
		chromeLocation: settings.chromeLocation,
	    waitAfterLastRequest: settings.prerenderWaitAfterLastRequest,
	    port: settings.prerenderPort
	})
	server.start()

	const cache = cacheManager.caching({
		store: 'memory', 
		max: settings.prerenderCacheMaxEntries, 
		ttl: settings.prerenderCacheTTL
	})

	onPageLoad(async function(sink) {

		// prerender gets vanilla page
		if(sink.request.headers['user-agent'].indexOf('Prerender') > -1) {
			return
		}

		var content = await promisify(cache.get)(sink.request.url.path)
			.then(result => {
				if (result) {
					return result
				}

				try {
					request('http://localhost:'+settings.prerenderPort+'/'+ Meteor.absoluteUrl().slice(0, -1) + sink.request.url.path).then(result => {

						// remove things or they'll be in the markup twice
						const $ = cheerio.load(result.body)

						$('script[type="text/javascript"]').remove()

						$('link[rel="stylesheet"]').remove()
						$('meta[name="viewport"]').remove()
						$('meta[name="fragment"]').remove()
						$('noscript').remove()

						$('#react-root').attr('id', 'react-root-preview').wrap('<div id="page-preview"></div>')

						// mark for destruction
						$('head').children().addClass("temporary-preview")
						$('body').children().addClass("temporary-preview")

						cache.set(sink.request.url.path, {
							head: $('head').html(),
							body: $('body').html()
						});

					})
				} 
				catch(error) {
					console.log(error)
				}
				return false

			})

		if(content) {
			sink.appendToHead(content.head)
			sink.appendToBody(content.body)
		}

		sink.appendToHead(injectHead())
		sink.appendToBody(injectBody(settings))

	})

});