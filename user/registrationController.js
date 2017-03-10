(function () {
	registerCtrl.$inject = ['User', 'Form', 'fancyboxService'];

	angular.module('app.user')
	       .controller('registerCtrl', registerCtrl);

	function registerCtrl(User, Form, fancyboxService) {
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
					if (data) {
						if (data.success) {
							fancyboxService.open('#regSuccess');
						} else {
							vm.errorMessage = data.message;
						}
					} else {
						vm.errorMessage = 'Ooops! Something went wrong. Please, try again.';
					}
					vm.user = Form.reset(form);
				});
			}
		}

		function resetError() {
			vm.errorMessage = undefined;
		}
	}
})();
