(function () {
	angular.module('app.products')
	       .controller('productCtrl', productCtrl);

	productCtrl.$inject = ['$scope', 'Products'];

	function productCtrl($scope, Products) {
		var vm = this;
		vm.products = [];
		vm.error = false;

		/* получаем список продуктов при инициализации приложения */
		activate();

		function activate() {
			/* следим, чтобы не было ошибок при получении продуктов от сервиса */
			$scope.$watch(Products.currentProductsState, function (success) {
				if (success) {
					vm.error = false;
				} else {
					vm.error = true;
				}
			});

			return getProducts();
		}

		function getProducts() {
			return Products.getProducts().then(function (products) {
				return products ? vm.products = products : vm.error = true;
			});
		}
	}
})();
