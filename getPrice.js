var currentPriceAsNumber = 0;
var currentPriceAsString = '0.00';

function getPrice(callback) {
	fetch('https://poloniex.com/public?command=returnTicker')
		.then(response => response.json())
		.then(response => {
		    var priceAsNumberWithDecimals = Number(response["USDT_ETH"]["last"]);
			currentPriceAsNumber = Math.round(priceAsNumberWithDecimals);

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


			// Display content when clicked.
            currentPriceAsString = priceAsNumberWithDecimals
                .toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2 }
                );
			if (callback) {
				callback(currentPriceAsString);
			}
		});
}

(function() {
	getPrice();
})();
