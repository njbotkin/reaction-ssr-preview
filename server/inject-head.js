export default function injectHead() {
	return `
<style type="text/css" class="temporary-preview">
	#page-preview {
		position:absolute;
		top:0;
		left:0;
		right:0;
		z-index:0;
	}
	#react-root {
		position:absolute;
		top:0;
		left:0;
		right:0;
		z-index:2;
	}

	/* Loading indicator, spreads over whole screen estate to intercept mouse events until view is rendered. */
	.spinner-container {
	  position:fixed;
	  left:0;
	  right:0;
	  top:0;
	  bottom:0;
	  background: #ffffff88;
	  z-index: 1;
	}

	.loading {
	  width: 200px;
	  margin: 0 auto;
	  position:absolute;
	  top: 40%;
	}

	.spinner {
	  margin: 0 auto;
	  width: 44px;
	  height: 44px;
	  border-width: 2px 2px 2px 2px;
	  border-color: black black transparent transparent;
	  border-style: solid;
	  border-radius: 22px;

	  animation-name: spinToWin;
	  animation-duration: 600ms;
	  animation-iteration-count: infinite;
	  animation-timing-function: linear;
	}

	@keyframes spinToWin {
	  0% { transform: rotate(0deg); }
	  100% { transform: rotate(360deg); }
	}
	.text {
		text-align: center;
		font-family: sans-serif;
		color: #000;
		margin-top: 15px;
	}
</style>
`;
}
