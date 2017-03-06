postReviewCtrl.$inject = ['$scope', 'Reviews'];

angular.module('review')
       .controller('postReviewCtrl', postReviewCtrl);

function postReviewCtrl($scope, Reviews) {
	$scope.postReview = function (form) {
		var productId = $scope.product.id,
			rate = $scope.product.rate,
			text = $scope.product.review;
		Reviews.postReview(productId, rate, text).then(function (success) {
			if (success) {
				$.fancybox.open({src: '#postSuccess'}, {
					touch: false,
					keyboard: false,
					focus: false
				});
				if (form) {
					form.$setPristine();
					form.$setUntouched();
				}
				$scope.product = undefined;
			}
		});
	}
}
