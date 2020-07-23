app.controller("currencySelectorCtrl", function($scope, $sce) {
	var self = this;

	this.getCurrentPrice = function(){
		self.currentPrice = "Loading...";
		$.get(self.getUrl(), function(response){
			var valueAsNumber = Number(response["USDT_ETH"]["last"]);
			chrome.browserAction.setBadgeText({text: valueAsNumber.toString()});
			$scope.$apply(function(){
				self.currentPrice = (valueAsNumber).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2, minimumFractionDigits: 2 });
				self.currentPrice = self.currentPrice.replace("$", "");
			});
		});
	};

	this.getUrl = function(){
		return "https://poloniex.com/public?command=returnTicker";
	};

	this.getCurrentPrice();
});
