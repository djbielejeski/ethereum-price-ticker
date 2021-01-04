var currentPriceAsNumber = 0;
var currentPriceAsString = '0.00';

function getPrice(callback) {
	fetch('https://poloniex.com/public?command=returnTicker')
		.then(response => response.json())
		.then(response => {
			currentPriceAsString = (Number(response["USDT_ETH"]["last"]))
				.toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
					maximumFractionDigits: 2,
					minimumFractionDigits: 2 }
				)
				.replace("$", "")
				.replace(",", "");

			currentPriceAsNumber = Number(currentPriceAsString);

			chrome.browserAction.getBadgeText({}, function(text){
				var previousValue = Number(text);

				if (previousValue > currentPriceAsNumber) {
					// value going down
					chrome.browserAction.setBadgeBackgroundColor({ color: '#f1592b' });
				}
				else {
					// value going up
					chrome.browserAction.setBadgeBackgroundColor({ color: '#19a05e' });
				}

				setTimeout(function() {
					chrome.browserAction.setBadgeBackgroundColor({ color: '#3367d6' });
				}, 2000);
			});

			chrome.browserAction.setBadgeText({text: currentPriceAsNumber.toString()});

			if (callback) {
				callback('$' + currentPriceAsString);
			}
		});
}

(function() {
	getPrice();
})();
