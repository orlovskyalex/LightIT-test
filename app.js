// @koala-prepend "products/app.products.js"
// @koala-prepend "products/productsController.js"
// @koala-prepend "products/productsModel.js"
// @koala-prepend "products/reviewsModel.js"

// @koala-prepend "shared/app.shared.js"
// @koala-prepend "shared/StateManager.js"

// @koala-prepend "user/app.user.js"
// @koala-prepend "user/authController.js"
// @koala-prepend "user/loginController.js"
// @koala-prepend "user/registrationController.js"
// @koala-prepend "user/userModel.js"
// @koala-prepend "user/userService.js"

(function () {
	angular.module('app', ['app.user', 'app.products', 'app.shared'])
	       .directive('index', index);

	function index() {
		return {
			restrict: 'A',
			link: link
		};

		function link() {
			angular.element(document).ready(function () {
				angular.element('body').on('click', '.fancybox', function () {
					var $this = $(this);
					$.fancybox.close();
					$.fancybox.open({src: $this.data('src')}, {
						touch: false,
						keyboard: false,
						focus: false
					});
				});
			});
		}
	}
})();
