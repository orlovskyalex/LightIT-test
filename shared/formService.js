(function () {
	angular.module('app.shared')
	       .factory('Form', Form);

	function Form() {
		return {
			reset: reset
		};

		function reset(form) {
			if (form) {
				form.$setPristine();
				form.$setUntouched();
			}
			return undefined;
		}
	}
})();
