(function () {
	StateManager.$inject = ['$rootScope'];

	angular.module('app.shared')
	       .factory('StateManager', StateManager);

	function StateManager($rootScope) {
		var stateContainer = [];

		return {
			add: function (service) {
				stateContainer.push(service);
				$rootScope.loaded = false;
			},

			remove: function (service) {
				var index = stateContainer.indexOf(service);
				stateContainer.splice(index, 1);

				if (stateContainer.length === 0) {
					$rootScope.loaded = true;
				}
			}
		}
	}
})();
