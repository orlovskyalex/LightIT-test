(function () {
	registerCtrl.$inject = ['User', 'userService', 'fancyboxService'];

	angular.module('app.user')
	       .controller('registerCtrl', registerCtrl);

	function registerCtrl(User, userService, fancyboxService) {
		var vm = this;
		vm.user = {};
		vm.errorMessage = undefined;

		vm.register = register;

		vm.resetError = resetError;

		function register(form) {
			var username = vm.user.username,
				password = vm.user.password;

			if (username && password) {
				User.register(username, password).then(function (data) {
					if (data.success) {
						fancyboxService.open('#regSuccess');
					} else {
						vm.errorMessage = data.message;
					}
					vm.user = userService.reset(form);
				});
			}
		}

		function resetError() {
			vm.errorMessage = undefined;
		}
	}
})();
