authCtrl.$inject = ['$scope', 'userModel'];

angular.module('user')
       .controller('authCtrl', authCtrl);

function authCtrl($scope, userModel) {
	$scope.getUser = function () {
		return userModel.user;
	};

	$scope.logout = function () {
		userModel.logout();
	};
}
