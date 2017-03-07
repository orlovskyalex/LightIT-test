(function () {
	angular.module('app.user')
	       .factory('userService', userService);

	function userService() {
		return {
			reset: reset
		};

		function reset(form) {
			if (form) {
				form.$setPristine();
				form.$setUntouched();
			}
			return {};
		}
	}
})();
