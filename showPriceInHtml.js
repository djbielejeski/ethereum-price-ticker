function refreshPrice() {
	var priceElement = document.getElementById('current-price');
	priceElement.innerText = 'Loading...';

	getPrice(function(priceAsString) {
		priceElement.innerText = priceAsString;
	});
}

(function() {
	document.getElementById("refresh-button").addEventListener("click", refreshPrice);
	refreshPrice();
})();
