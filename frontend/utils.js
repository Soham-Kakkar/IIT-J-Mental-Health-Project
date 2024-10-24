export async function initSlider() {
	try {
		const response = await fetch('./event-gallery.json');
		const data = await response.json();

		const container = document.querySelector('.splide__list');
		const thumbnailContainer = document.querySelector('#thumbnails');

		data.images.forEach(image => {
			container.innerHTML += `
                <li class="splide__slide">
                  <img src="${image.src}" alt="${image.alt}"/>
                </li>`;

			// Repeat for thumbnails
			thumbnailContainer.innerHTML += `
            <li class="thumbnail">
              <img src="${image.src}" alt="${image.alt}"/>
            </li>`;
		});

		// Initialize the Splide slider after adding all images
		var splide = new Splide("#main-slider", {
			type: 'loop',
			width: 600,
			height: 300,
			pagination: false,
			autoplay: true,
			lazyLoad: true,
			padding: '10px',
			gap: '20px',
			video: {
				mute: true
			}
		});		
		const splideImages = document.querySelectorAll('.splide__slide img');

		// Apply the object-fit style to each image
		splideImages.forEach(img => {
			img.style.width = '100%';
			img.style.height = '100%';
			img.style.objectFit = 'contain';
		});
		var thumbnails = document.getElementsByClassName("thumbnail");
		var current;

		for (var i = 0; i < thumbnails.length; i++) {
			initThumbnail(thumbnails[i], i);
		}

		function initThumbnail(thumbnail, index) {
			thumbnail.addEventListener("click", function () {
				splide.go(index);
			});
		}

		splide.on("mounted move", function () {
			var thumbnail = thumbnails[splide.index];

			if (thumbnail) {
				if (current) {
					current.classList.remove("is-active");
				}

				thumbnail.classList.add("is-active");
				current = thumbnail;
			}
		});

		splide.mount( window.splide.Extensions );

	} catch (error) {
		console.error('Error fetching images:', error);
		document.querySelector('.events.section').innerHTML += "<pre>failed to load images</pre>"
	}
}

export async function wellnessBuddies() {
	try {
		const response = await fetch('./wellness-buddies.json');
		const data = await response.json();
		const container = document.querySelector('.wellness-buddies.section');

		// Determine the number of widgets per row based on the device width
		let widgetsPerRow = 4; // Default for desktop
		const isTablet = window.matchMedia('(max-width: 1024px)').matches;

		if (isTablet) {
			widgetsPerRow = 3; // Use 3 widgets for tablets
		}

		// Loop through the data, and create a new .widgets div for each set of widgetsPerRow wellness buddies
		for (let i = 0; i < data.wellnessBuddies.length; i += widgetsPerRow) {
			let widgets = document.createElement('div');
			widgets.classList.add('widgets');

			// Add the number of .widget divs based on the widgetsPerRow value
			for (let j = i; j < i + widgetsPerRow && j < data.wellnessBuddies.length; j++) {
				// Add the wellness buddy's name and email into the .widget div
				widgets.innerHTML += `
                    <div class="widget">
                        <div class="Wellnessbuddy">
                            <div class="counselor-image">
                                <img src="${data.wellnessBuddies[j].image}" alt="${data.wellnessBuddies[j].name}">
                            </div>
                            <div class="counselor-info">
                                <h3 class="name">${data.wellnessBuddies[j].name} (Undergrad @ IIT Jammu)</h3>
                                <p class="contact">Email: <a href="mailto:${data.wellnessBuddies[j].email}">${data.wellnessBuddies[j].email}</a></p>
                                <button onclick="location.href='mailto:${data.wellnessBuddies[j].email}'">Email</button>
                            </div>
                        </div>
                    </div>`;
			}

			// Append the widgets container to the main container
			container.appendChild(widgets);
		}
	} catch (error) {
		console.error('Error fetching resources:', error);
		document.querySelector('.wellness-buddies.section').innerHTML += "<pre>failed to load resources</pre>";
	}
}

export async function resources() {
	try {
		const response = await fetch('./resources.json');
		const data = await response.json();
		const container = document.querySelector('.conditions.section');
		const widgets = document.querySelector('.widgets')

			for (let j = 0; j <data.resources.length; j++) {
				widgets.innerHTML += `
					<div class="condition widget" data-condition="${data.resources[j].name}">
                    <img src="${data.resources[j].image}" alt="${data.resources[j].name}" class="widget-image">
                    <h3 class="widget-title">${data.resources[j].name}</h3>
                    <p class="widget-description">${data.resources[j].shortArticle}</p>
                    <div class="buttons"><button class="learn-more" onclick="location.href='article.html?name=${data.resources[j].name}'">Learn More</button></div>
                </div>`;
			}
			container.appendChild(widgets);
		} catch (error) {
		console.error('Error fetching resources:', error);
		document.querySelector('.conditions.section').innerHTML += "<pre>failed to load resources info</pre>";
	}
}
