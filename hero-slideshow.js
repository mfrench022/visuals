// hero slideshow: crossfades the hero images and swaps the caption to match
const SLIDE_DURATION = 8000; // time each image stays up, in ms
const CAPTION_FADE = 300; // keep in sync with --transition in style.css

// ===== CAPTIONS: replace the placeholder text below =====
// one caption per image, in order (hero1.jpg, hero2.jpg, hero3.jpg, hero4.jpg)
const CAPTIONS = [
	'Packaging design for Jackfir, an organic men’s grooming brand', // hero1.jpg
	'Data visualization of LGBTQ+ history based on Audible Theater’s ‘The Pansy Craze’', // hero2.jpg
	'Branding for Camp Chiswell, a family campsite in Vermont', // hero3.jpg
	'Marketing and poster design for an orchestral and dance performance, ‘Through Shifting Seasons’', // hero4.jpg
];
// ===== END CAPTIONS =====

document.addEventListener('DOMContentLoaded', () => {
	const slides = document.querySelectorAll('.hero img, .hero video');
	const caption = document.querySelector('.hero-caption p');
	if (slides.length < 2) return;

	let current = 0;
	let captionTimer;

	const showSlide = (index) => {
		slides[current].classList.remove('is-active');
		slides[index].classList.add('is-active');
		current = index;

		// start videos from the beginning each time they come up
		if (slides[index] instanceof HTMLVideoElement) {
			slides[index].currentTime = 0;
			slides[index].play().catch(() => {});
		}

		// fade the caption out, swap the text, fade it back in
		clearTimeout(captionTimer);
		caption.classList.add('is-fading');
		captionTimer = setTimeout(() => {
			caption.textContent = CAPTIONS[index];
			caption.classList.remove('is-fading');
		}, CAPTION_FADE);
	};

	setInterval(() => showSlide((current + 1) % slides.length), SLIDE_DURATION);
});
