export default function injectBody(settings) {
	return `
<div class="spinner-container temporary-preview">
	<div class="loading">
		<div class="spinner"></div>
		<div class="text">` + settings.loadingText + `</div>
	</div>
</div>

<script type="text/javascript" class="temporary-preview">

	function removePreview() {
		var temps = document.querySelectorAll('.temporary-preview')

		for(var i = 0; i < temps.length; i++) {
			temps[i].remove()
		}
	}

	var observer = new MutationObserver(function (mutations) {

		for(var i = 0; i < mutations.length; i++) {
			for(var i2 = 0; i2 < mutations[i].addedNodes.length; i2++) {
				if(mutations[i].addedNodes[i2].id === 'react-root') {
					setTimeout(removePreview, ` + settings.replaceDelay + `) // takes a while for react to render
					observer.disconnect()
					return
				}
			}
		}

	})

	observer.observe(document.body, { childList: true, subtree: false })

</script>
	`;
}