(function () {
	loginCtrl.$inject = ['$scope', 'User', 'Form', 'fancyboxService'];

	angular.module('app.user')
	       .controller('loginCtrl', loginCtrl);

	function loginCtrl($scope, User, Form, fancyboxService) {
		$scope.login = function (form) {
			var username = $scope.user.username,
				password = $scope.user.password;

			if (username && password) {
				User.login(username, password).then(function (data) {
					if (data.success) {
						fancyboxService.close();
					} else {
						$scope.errorMessage = data.message;
					}
					$scope.user = Form.reset(form);
				});
			}
		};

		$scope.onInput = function () {
			$scope.errorMessage = false;
		};
	}
})();
