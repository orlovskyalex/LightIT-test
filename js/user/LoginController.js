loginCtrl.$inject = ['$scope', 'userModel'];

angular.module('user')
       .controller('loginCtrl', loginCtrl);

function loginCtrl($scope, userModel) {
	$scope.login = function (form) {
		var username = $scope.user.username,
			password = $scope.user.password;
		if (username && password) {
			if (userModel.login(username, password)) {
				$scope.resetForm(form);
			}
		}
	};

	$scope.resetForm = function (form) {
		if (form) {
			form.$setPristine();
			form.$setUntouched();
		}
		$scope.user = undefined;
	};
}
