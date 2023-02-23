window.getTheme = function getTheme() {
	return localStorage.getItem("theme-preference");
}

window.toggleTheme = function toggleTheme(theme) {
	if (theme === "system") {
		document.documentElement.removeAttribute("data-theme");
		localStorage.removeItem("theme-preference");
	} else {
		document.documentElement.dataset.theme = theme;
		localStorage.setItem("theme-preference", theme);
	}

	document
		.querySelectorAll('link[href*="/css/prism"]')
		.forEach(function (link) {
			const media = link.getAttribute("media");

			if (
				theme === "dark" ||
				(theme === "system" && media === "(prefers-color-scheme: dark)")
			) {
				link.href = link.href.replace("prism.css", "prism-tomorrow.css");
			} else {
				link.href = link.href.replace("prism-tomorrow.css", "prism.css");
			}
		});
}

const theme = localStorage.getItem("theme-preference");
if (theme) {
	toggleTheme(theme);
}

