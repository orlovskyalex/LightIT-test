(function () {
	authCtrl.$inject = ['$scope', 'User'];

	angular.module('app.user')
	       .controller('authCtrl', authCtrl);

	function authCtrl($scope, User) {
		var vm = this;

		vm.logout = logout;

		activate();

		function activate() {
			$scope.$watch(User.getUser, function (newUser) {
				vm.user = newUser;
			});
		}

		function logout() {
			User.logout();
		}
	}
})();
