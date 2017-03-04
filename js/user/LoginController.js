loginCtrl.$inject = ['$scope', 'User', 'userService'];

angular.module('user')
       .controller('loginCtrl', loginCtrl);

function loginCtrl($scope, User, userService) {
	$scope.login = function (form) {
		var username = $scope.user.username,
			password = $scope.user.password;

		if (username && password) {
			User.login(username, password).then(function (data) {
				if (data.success) {
					/* TODO: вынести в директиву */
					$.fancybox.close();
				} else {
					$scope.errorMessage = data.message;
				}
				$scope.user = userService.reset(form);
			});
		}
	};

	$scope.onInput = function () {
		$scope.errorMessage = false;
	};
}
