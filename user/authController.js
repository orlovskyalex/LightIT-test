(function () {
	authCtrl.$inject = ['$scope', 'User'];

	angular.module('app.user')
	       .controller('authCtrl', authCtrl);

	function authCtrl($scope, User) {
		$scope.$watch(User.getUser, function (newUser) {
			$scope.user = newUser;
		});

		$scope.logout = function () {
			User.logout();
		};
	}
})();
