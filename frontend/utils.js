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

export async function vidplayer(initialVidId) {
    const player = document.querySelector('.video-section');

    const renderPlayer = (mainVidId) => {
        player.innerHTML = `
        <div class="vidContainer">
            <div class="mainVid">
                <iframe title="main video" src="https://www.youtube.com/embed/${mainVidId}" class="vidIframe" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
            <div class="vidThumbnailContainer">
                ${getThumbnails(mainVidId)}
            </div>
        </div>
        <style>
            .vidContainer {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 10px;
                max-width: 640px;
                margin: auto;
                justify-content: space-around;
				box-sizing: border-box;
            }

            .mainVid {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .mainVid .vidIframe {
                width: 90vw;
                max-width: 640px;
                aspect-ratio: 16/9;
            }

            .vidThumbnailContainer {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                max-width: 640px;
                min-width: 25rem;
				max-height: 100%;
            }

            .vidThumbnail {
                display: flex;
                align-items: center;
                text-decoration: none;
                color: #000;
                width: 100%;
                position: relative;
				text-align: left;
                padding-top: 5px;
                padding-bottom: 5px;
            }

            .vidThumbnail:hover {
                background-color: #dedede;
            }

            .vidThumbnail .vidImg {
                width: 100%;
                max-width: 160px;
            }

            .vidThumbnail * {
                margin-left: 20px;
            }

            .playBtn {
                position: absolute;
                top: 50%;
                left: 0;
                transform: translate(100%, -50%);
                width: 3rem;
                height: 3rem;
                font-size: 24px;
                color: white;
                background-color: rgba(0, 0, 0, 0.5);
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }

            /* Media query for desktop */
            @media (min-width: 1025px) {
                .vidContainer {
                    flex-direction: row;
                    justify-content: center;
                    align-items: flex-start;
                    max-width: 1200px; /* Set max width */
                }

                .mainVid {
                    flex: 1;
                    margin-right: 20px;
                }

                .vidThumbnailContainer {
                    flex: 1;
                    justify-content: flex-start;
                    align-items: start;
                    overflow-y: auto; /* Allows scrolling if thumbnails exceed container height */
                }

                .vidThumbnail .vidImg {
                    margin: 10px;
                }
            }
        </style>
    `;

        document.querySelectorAll('.vidThumbnail').forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const selectedVidId = thumbnail.getAttribute('data-video-id');
                renderPlayer(selectedVidId);
            });
        });
    };

    const getThumbnails = (mainVidId) => {
        const videos = [
            { id: "SmRhPEWA5PU", title: "How To Cope With Depression" },
            { id: "WXbttnDkp7E", title: "How Drug and Alcohol Abuse Affect the Brain" },
            { id: "lQhpetkwWnM", title: "Mental Health Minute: Depression" },
            { id: "8Su5VtKeXU8", title: "How To Cope With Depression" }
        ];

        return videos
            .filter(video => video.id !== mainVidId)
            .map(video => `
                <div class="vidThumbnail" data-video-id="${video.id}">
                    <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" alt="${video.title}" class="vidImg">
                    <div class="playBtn">&#9658;</div>
                    <p>${video.title}</p>
                </div>
            `)
            .join('');
    };

    renderPlayer(initialVidId);
}

