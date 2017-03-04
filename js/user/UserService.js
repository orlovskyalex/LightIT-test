angular.module('user')
       .factory('userService', userService);

function userService() {
	return {
		reset: function (form) {
			if (form) {
				form.$setPristine();
				form.$setUntouched();
			}
			return undefined;
		}
	}
}
