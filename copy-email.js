// copy email to clipboard + show "email copied" toast
const TOAST_DURATION = 2000;

document.addEventListener('DOMContentLoaded', () => {
	const toast = document.querySelector('.toast');
	const nav = document.querySelector('nav');
	let hideTimer;

	const showToast = (message) => {
		// sit just below the nav, whatever its current height (it wraps on small screens)
		toast.style.setProperty('--nav-bottom', `${nav.getBoundingClientRect().bottom}px`);
		toast.textContent = message;
		toast.classList.add('is-visible');

		clearTimeout(hideTimer);
		hideTimer = setTimeout(() => toast.classList.remove('is-visible'), TOAST_DURATION);
	};

	document.querySelectorAll('[data-copy-email]').forEach((link) => {
		link.addEventListener('click', async (event) => {
			// no clipboard access (e.g. non-https): let the mailto link work as normal
			if (!navigator.clipboard) return;

			event.preventDefault();
			try {
				await navigator.clipboard.writeText(link.dataset.copyEmail);
				showToast('Email copied to clipboard.');
			} catch {
				window.location.href = link.href;
			}
		});
	});
});
