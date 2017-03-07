(function () {
	angular.module('app.shared')
	       .factory('fancyboxService', fancyboxService);

	function fancyboxService() {
		return {
			open: open
		};

		function open(src) {
			$.fancybox.close();
			$.fancybox.open(
				{
					src: src.toString()
				},
				{
					focus: false,
					keyboard: false,
					touch: false
				}
			);
		}
	}
})();
