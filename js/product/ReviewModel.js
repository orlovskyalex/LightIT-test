Reviews.$inject = ['$http'];

angular.module('product')
       .service('Reviews', Reviews);

function Reviews($http) {
	return {
		getReviews: function (productId) {
			var req = {
				method: 'GET',
				url: 'https://smktesting.herokuapp.com/api/reviews/' + productId
			};
			return $http(req).then(function (response) {
				return response.data;
			});
		}
	}
}
