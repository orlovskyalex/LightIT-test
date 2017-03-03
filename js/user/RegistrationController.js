registerCtrl.$inject = ['$scope', 'userModel'];

angular.module('user')
       .controller('registerCtrl', registerCtrl);

function registerCtrl($scope, userModel) {
	$scope.register = function (form) {
		var username = $scope.user.username,
			password = $scope.user.password;
		if (username && password) {
			if (userModel.register(username, password)) {
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
