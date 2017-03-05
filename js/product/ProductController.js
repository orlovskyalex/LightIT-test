productCtrl.$inject = ['$scope', 'Products', 'reviewModel'];

angular.module('product')
       .controller('productCtrl', productCtrl);

function productCtrl($scope, Products, reviewModel) {
	/* прелоадер */
	$scope.loading = true;

	/* получаем список продуктов при инициализации приложения */
	Products.getProducts().then(function (products) {
		$scope.products = products;
		$scope.loading = false;
	});

	/* получаем отзывы к продукту при клике на продукт */
	$scope.getReviews = function (productId) {
		reviewModel.getReviews(productId).then(function (reviews) {
			$scope.reviews = reviews;
		});
	};
}
