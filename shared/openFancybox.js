(function () {
	angular.module('app.shared')
	       .directive('openFancybox', openFancybox);

	function openFancybox() {
		return {
			restrict: 'A',
			scope: {
				target: '@openFancybox'
			},
			link: function (scope, element) {
				element.on('click', function () {
					$.fancybox.close();
					$.fancybox.open(
						{
							src: scope.target
						},
						{
							focus: false,
							keyboard: false,
							touch: false
						}
					);
				});
			}
		}
	}
})();
