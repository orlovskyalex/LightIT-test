fancybox.$inject = ['fancyboxService'];

angular.module('app.shared')
       .directive('fancybox', fancybox);

function fancybox(fancyboxService) {
	return {
		restrict: 'A',
		scope: {
			fancybox: '@'
		},
		link: function (scope, element) {
			element.on('click', function () {
				fancyboxService.open(scope.fancybox);
			});
		}
	}
}
