angular.module('app.reviews')
       .controller('postReviewCtrl', postReviewCtrl);

postReviewCtrl.$inject = ['Reviews', 'fancyboxService'];

function postReviewCtrl(Reviews, fancyboxService) {
	var vm = this;
	vm.product = {};
	vm.error = false;

	vm.postReview = postReview;
	vm.resetError = resetError;

	function postReview(form) {
		var productId = vm.product.id,
			rate = vm.product.rate,
			text = vm.product.review;

		Reviews.postReview(productId, rate, text).then(function (success) {
			if (success) {
				fancyboxService.open('#postSuccess');
				if (form) {
					form.$setPristine();
					form.$setUntouched();
				}
				vm.product = {};
			} else {
				vm.error = true;
			}
		});
	}

	function resetError() {
		vm.error = false;
	}
}
