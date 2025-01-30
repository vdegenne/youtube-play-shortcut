chrome.commands.onCommand.addListener(async (command) => {
	if (command === 'toggle-play') {
		// Get all open YouTube tabs
		let tabs = await chrome.tabs.query({url: '*://www.youtube.com/*'});

		if (tabs.length > 0) {
			// Find the last active YouTube tab
			let lastTab = tabs[tabs.length - 1];

			// Execute the content script on that tab
			chrome.scripting.executeScript({
				target: {tabId: lastTab.id},
				// files: ["content.js"],
				func: () => {
					const video = document.querySelector('video');
					if (video.paused) {
						video.play();
					} else {
						video.pause();
					}
				},
			});
		}
	}
});
