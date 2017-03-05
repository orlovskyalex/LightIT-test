productCtrl.$inject = ['$scope', 'Products'];

angular.module('product')
       .controller('productCtrl', productCtrl);

function productCtrl($scope, Products) {
	/* получаем список продуктов при инициализации приложения */
	Products.getProducts().then(function (products) {
		$scope.products = products;
	});
}
