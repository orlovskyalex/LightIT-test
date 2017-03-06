Reviews.$inject = ['$http'];

angular.module('review')
       .service('Reviews', Reviews);

function Reviews($http) {
	return {
		getReviews: function (productId) {
			var req = {
				method: 'GET',
				url: 'https://smktesting.herokuapp.com/api/reviews/' + productId
			};
			return $http(req).then(function (response) {
				var reviews = response.data,
					convertedDate,
					rawDate;

				/* конвертируем дату отзыва в другой формат */
				for (var i in reviews) {
					convertedDate = '';
					rawDate = reviews[i].created_at.split('T').splice(0, 1)[0].split('-');
					for (var j = rawDate.length - 1; j >= 0; j--) {
						convertedDate += rawDate[j] + '.';
					}
					reviews[i].created_at = convertedDate.slice(0, -1);
				}

				return reviews.reverse();
			});
		},

		/* при расчёте среднего рейтинга не учитываются оценки 0 */
		getAverageRate: function (product) {
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
				decimal;
			if (averageRate % 1 == 0) {
				decimal = 0;
			} else {
				decimal = 1;
			}

			averageRate = (Math.round(averageRate * 2) / 2).toFixed(decimal);
			return averageRate;
		},

		postReview: function (productId, rate, text) {
			var req = {
				method: 'POST',
				url: 'https://smktesting.herokuapp.com/api/reviews/' + productId,
				data: {
					rate: rate,
					text: text
				}
			};
			return $http(req).then(function (response) {
				return response.data.success;
			});
		}
	}
}
