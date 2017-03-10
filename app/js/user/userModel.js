User.$inject = ['$http', '$cookies'];

angular.module('app.user')
       .factory('User', User);

function User($http, $cookies) {
	var user = {};

	if (user = $cookies.getObject('user')) {
		$http.defaults.headers.common['Authorization'] = 'Token ' + user.token;
	}

	return {
		getUser: getUser,
		register: register,
		login: login,
		logout: logout
	};

	function getUser() {
		return user;
	}

	function register(username, password) {
		var req = {
			method: 'POST',
			url: 'https://smktesting.herokuapp.com/api/register/',
			data: {
				username: username,
				password: password
			}
		};
		return $http(req)
			.then(registerComplete)
			.catch(registerFailed);

		function registerComplete(response) {
			return response.data;
		}

		function registerFailed() {
			return undefined;
		}
	}

	function login(username, password) {
		var req = {
			method: 'POST',
			url: 'https://smktesting.herokuapp.com/api/login/',
			data: {
				username: username,
				password: password
			}
		};
		return $http(req)
			.then(loginComplete)
			.catch(loginFailed);

		function loginComplete(response) {
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
		}

		function loginFailed() {
			return undefined;
		}
	}

	function logout() {
		$cookies.remove('user');
		$http.defaults.headers.common['Authorization'] = undefined;
		user = undefined;
	}
}
