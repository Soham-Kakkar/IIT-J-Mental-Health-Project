// Function to get the query parameter value
function getQueryParam(param) {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(param);
}

async function loadArticle() {
	try {
		// Get the resource ID from the query parameter
		const resourceName = getQueryParam('name');

		// Fetch resources.json
		const response = await fetch('./resources.json');
		const data = await response.json();
		const resource = data.resources.find(r => r.name.toLowerCase() === resourceName.toLowerCase());

		// Display the article in the widget
		document.title = `${resource.name} Article | Manomitra`;
		const articleWidget = document.getElementById('full-article-widget');
		articleWidget.innerHTML = `
			<div class="condition widget">
				<h2 class="condition-name" style="text-align:center;">${resource.name}</h2>
				<div class="video-section" style="display: flex; justify-content:center;">
					<iframe title="video" src="https://www.youtube.com/embed/${resource.video}" frameborder="0" allowfullscreen style="height:30vmax; max-width: 99vw; aspect-ratio:16/9;"></iframe>
				</div>
				<div class="article-section">
					<h3>Understanding ${resource.name}</h3>
					<p>${resource.article}</p>
				</div>
			</div>
		`;
	} catch (error) {
		console.error('Error loading article:', error);
		document.getElementById('full-article-widget').innerHTML = "<pre>Failed to load article</pre>";
	}
}

// Load the article when the page loads
window.onload = loadArticle;
