Products.$inject = ['$http', 'Reviews', 'StateManager'];

angular.module('product')
       .factory('Products', Products);

function Products($http, Reviews, StateManager) {
	return {
		getProducts: function () {
			var req = {
				method: 'GET',
				url: 'https://smktesting.herokuapp.com/api/products/'
			};
			return $http(req).then(function (response) {
				var products = response.data;

				/* для каждого продукта сразу получаем его отзывы и считаем средний рейтинг */
				for (var i in products) {
					var productId = products[i].id,
						taskId = 'product_' + productId;

					/* чтобы пользователь не видел "неподготовленные" продукты, добавляем текущую задачу в список
					 активных (активирует прелоадер) */
					StateManager.add(taskId);
					Reviews.getReviews(productId).then((function (i, taskId) {
						return function (reviews) {
							products[i].reviews = reviews;
							products[i].reviewsNumber = reviews.length;
							products[i].averageRate = Reviews.getAverageRate(products[i]);
							StateManager.remove(taskId);
						}
					})(i, taskId));
				}

				return products;
			});
		}
	}
}
