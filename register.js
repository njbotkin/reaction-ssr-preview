import { Reaction } from "/server/api";

Reaction.registerPackage({
  label: "SSR Preview",
  name: "reaction-ssr-preview",
  icon: "fa fa-building",
  autoEnable: true,
  settings: {
  	prerenderPort: 3005,
  	chromeLocation: '/usr/bin/chromium-browser',
  	prerenderWaitAfterLastRequest: 5000,
  	prerenderCacheMaxEntries: 100,
  	prerenderCacheTTL: 60 * 60 * 24, /* one day */
  	replaceDelay: 2000,
  	loadingText: 'Hold on...'
  },
  registry: []
});