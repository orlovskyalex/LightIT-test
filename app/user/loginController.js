(function () {
	loginCtrl.$inject = ['User', 'Form', 'fancyboxService'];

	angular.module('app.user')
	       .controller('loginCtrl', loginCtrl);

	function loginCtrl(User, Form, fancyboxService) {
		var vm = this;
		vm.user = {};
		vm.errorMessage = undefined;

		vm.login = login;
		vm.resetError = resetError;

		function login(form) {
			var username = vm.user.username,
				password = vm.user.password;

			if (username && password) {
				User.login(username, password).then(function (data) {
					if (data) {
						if (data.success) {
							fancyboxService.close();
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
			vm.errorMessage = false;
		}
	}
})();
