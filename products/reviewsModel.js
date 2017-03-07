(function () {
	Reviews.$inject = ['$http'];

	angular.module('app.products')
	       .service('Reviews', Reviews);

	function Reviews($http) {
		return {
			getReviews: getReviews,
			getAverageRate: getAverageRate /* при расчёте среднего рейтинга не учитываются оценки 0 */
		};

		function getReviews(productId) {
			var req = {
				method: 'GET',
				url: 'https://smktesting.herokuapp.com/api/reviews/' + productId
			};
			return $http(req)
				.then(getReviewsComplete)
				.catch(getReviewsFailed);

			function getReviewsComplete(response) {
				return response.data;
			}

			function getReviewsFailed() {
				return undefined;
			}
		}

		function getAverageRate(product) {
			var reviews = product.reviews,
				count = 0,
				rate = 0;

			for (var i in reviews) {
				var currentRate = reviews[i].rate;
				if (currentRate > 0) {
					rate += currentRate;
					count++;
				}
			}

			/* "округляем" полученное число с шагом 0.5 */
			var averageRate = rate / count,
				decimal = (averageRate % 1 == 0) ? 0 : 1;
			averageRate = (Math.round(averageRate * 2) / 2).toFixed(decimal);

			return averageRate;
		}
	}
})();
