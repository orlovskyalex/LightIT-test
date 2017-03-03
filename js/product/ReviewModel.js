reviewModel.$inject = ['$http'];

angular.module('product')
       .service('reviewModel', reviewModel);

function reviewModel($http) {
	this.getReviews = function (productId) {
		var req = {
			method: 'GET',
			url: 'https://smktesting.herokuapp.com/api/reviews/' + productId
		};
		return $http(req).then(function (response) {
			return response.data;
		});
	};
}
