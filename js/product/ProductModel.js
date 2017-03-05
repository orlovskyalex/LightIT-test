Products.$inject = ['$http'];

angular.module('product')
       .factory('Products', Products);

function Products($http) {
	return {
		getProducts: function () {
			var req = {
				method: 'GET',
				url: 'https://smktesting.herokuapp.com/api/products/'
			};
			return $http(req).then(function (response) {
				return response.data;
			});
		}
	}
}
