User.$inject = ['$http', '$cookies'];

angular.module('user')
       .factory('User', User);

function User($http, $cookies) {
	var user;

	if (user = $cookies.getObject('user')) {
		$http.defaults.headers.common['Authorization'] = 'Token ' + user.token;
	}

	return {
		getUser: function () {
			return user;
		},
		register: function (username, password) {
			var req = {
				method: 'POST',
				url: 'https://smktesting.herokuapp.com/api/register/',
				data: {
					username: username,
					password: password
				}
			};
			return $http(req).then(function (response) {
				return response.data;
			});
		},
		login: function (username, password) {
			var req = {
				method: 'POST',
				url: 'https://smktesting.herokuapp.com/api/login/',
				data: {
					username: username,
					password: password
				}
			};
			return $http(req).then(function (response) {
				if (response.data.success) {
					user = {
						username: username,
						token: response.data.token
					};

					$http.defaults.headers.common['Authorization'] = 'Token ' + user.token;

					var date = new Date();
					date.setDate(date.getDate() + 1);
					$cookies.putObject('user', user, {expires: date});
				}
				return response.data;
			});
		},
		logout: function () {
			$cookies.remove('user');
			$http.defaults.headers.common['Authorization'] = undefined;
			user = undefined;
		}
	}
}
