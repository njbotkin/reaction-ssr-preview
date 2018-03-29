Serves a non-interactive "preview" of the page while the client is waiting for the bundle to download/initialize.  

![screencap](screencap.gif)

## internals

Runs a prerender server locally to render previews of Reaction Commerce pages, then saves them in an in-memory cache.  If the requested page isn't in cache no preview is served, if it is in cache the preview is instant.

## install

`git clone` this repo into /imports/plugins/custom and restart Reaction.  Requires Google Chrome/Chromium to be already installed on your system. 
