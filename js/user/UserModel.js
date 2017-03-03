userModel.$inject = ['$http', '$cookies'];

angular.module('user')
       .service('userModel', userModel);

function userModel($http, $cookies) {
	var self = this;

	if (self.user = $cookies.getObject('user')) {
		$http.defaults.headers.common['Authorization'] = 'Token ' + self.user.token;
	}

	self.login = function (username, password) {
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
				self.authUser(username, response.data.token);
				return true;
			}
			return false;
		});
	};

	self.register = function (username, password) {
		var req = {
			method: 'POST',
			url: 'https://smktesting.herokuapp.com/api/register/',
			data: {
				username: username,
				password: password
			}
		};
		return $http(req).then(function (response) {
			if (response.data.success) {
				self.authUser(username, response.data.token);
				return true;
			}
			return false;
		});
	};

	self.authUser = function (username, token) {
		$http.defaults.headers.common['Authorization'] = 'Token ' + token;
		self.user = {
			username: username,
			token: token
		};
		var date = new Date();
		date.setDate(date.getDate() + 3);
		$cookies.putObject('user', self.user, {expires: date});
	};

	self.logout = function () {
		$cookies.remove('user');
		$http.defaults.headers.common['Authorization'] = undefined;
		self.user = undefined;
	};
}
