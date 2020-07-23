app.controller("getPriceCtrl", function($interval) {
	var self = this;
	this.getCurrentPrice = function(){
		$.get(self.getUrl(), function(response){
			var valueAsNumber = Number(response["USDT_ETH"]["last"]);
			chrome.browserAction.setBadgeText({text: valueAsNumber.toString()});
		});
	};

	this.getUrl = function(){
		return "https://poloniex.com/public?command=returnTicker";
	};

	self.getCurrentPrice();

	$interval(self.getCurrentPrice, 20000);
});
