(function () {
	angular.module('app.products')
	       .controller('productCtrl', productCtrl);

	productCtrl.$inject = ['$scope', 'Products', 'User'];

	function productCtrl($scope, Products, User) {
		var vm = this;
		vm.products = [];
		vm.errorMessage = undefined;

		/* получаем список продуктов при инициализации приложения */
		activate();

		function activate() {
			/* следим, чтобы не было ошибок при получении продуктов от сервиса */
			$scope.$watch(Products.currentProductsState, function (success) {
				vm.errorMessage = !success;
			});

			$scope.$watch(User.getUser, function (newUser) {
				vm.user = newUser;
			});

			return getProducts();
		}

		function getProducts() {
			return Products.getProducts().then(function (result) {
				if (typeof result == 'string') {
					return vm.errorMessage = result;
				} else {
					return vm.products = result;
				}
			});
		}
	}
})();
