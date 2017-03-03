productCtrl.$inject = ['$scope', 'productModel', 'reviewModel'];

angular.module('product')
       .controller('productCtrl', productCtrl);

function productCtrl($scope, productModel, reviewModel) {
	/* получаем список продуктов при инициализации приложения */
	productModel.getProducts().then(function (products) {
		$scope.products = products;
	});

	/* получаем отзывы к продукту при клике на продукт */
	$scope.getReviews = function (productId) {
		reviewModel.getReviews(productId).then(function (reviews) {
			$scope.reviews = reviews;
		});
	};
}
