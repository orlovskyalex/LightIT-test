(function () {
	angular.module('app.products')
	       .controller('productCtrl', productCtrl);

	productCtrl.$inject = ['Products'];

	function productCtrl(Products) {
		var vm = this;
		vm.products = [];
		vm.error = false;

		/* получаем список продуктов при инициализации приложения */
		activate();

		function activate() {
			return getProducts();
		}

		function getProducts() {
			return Products.getProducts().then(function (products) {
				return products ? vm.products = products : vm.error = true;
			});
		}
	}
})();
