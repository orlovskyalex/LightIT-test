productCtrl.$inject = ['$scope', 'Products', 'User'];

angular.module('product')
       .controller('productCtrl', productCtrl);

function productCtrl($scope, Products, User) {
	/* получаем список продуктов при инициализации приложения */
	Products.getProducts().then(function (products) {
		$scope.products = products;
	});

	$scope.$watch(User.getUser, function (newUser) {
		$scope.user = newUser;
	});
}
