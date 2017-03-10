(function () {
	StateManager.$inject = ['$rootScope'];

	angular.module('app.shared')
	       .factory('StateManager', StateManager);

	function StateManager($rootScope) {
		var stateContainer = [];

		return {
			add: add,
			remove: remove
		};

		function add(service) {
			stateContainer.push(service);
			$rootScope.loaded = false;
		}

		function remove(service) {
			var index = stateContainer.indexOf(service);
			stateContainer.splice(index, 1);

			if (stateContainer.length === 0) {
				$rootScope.loaded = true;
			}
		}
	}
})();
