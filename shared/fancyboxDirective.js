(function () {
	fancybox.$inject = ['fancyboxService'];

	angular.module('app.shared')
	       .directive('fancybox', fancybox);

	function fancybox(fancyboxService) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				element.bind('click', function () {
					fancyboxService.open(attrs.fancyboxSrc);
				});
			}
		}
	}
})();
