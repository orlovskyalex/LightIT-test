productModel.$inject = ['$http'];

angular.module('product')
       .service('productModel', productModel);

function productModel($http) {
	this.getProducts = function () {
		var req = {
			method: 'GET',
			url: 'https://smktesting.herokuapp.com/api/products/'
		};
		return $http(req).then(function (response) {
			return response.data;
		});
	};
}
