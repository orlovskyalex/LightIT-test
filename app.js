// @koala-prepend "products/app.products.js"
// @koala-prepend "products/productsController.js"
// @koala-prepend "products/productsModel.js"

// @koala-prepend "reviews/app.reviews.js"
// @koala-prepend "reviews/postReviewController.js"
// @koala-prepend "reviews/reviewsModel.js"

// @koala-prepend "shared/app.shared.js"
// @koala-prepend "shared/fancyboxDirective.js"
// @koala-prepend "shared/fancyboxService.js"
// @koala-prepend "shared/formService.js"
// @koala-prepend "shared/StateManager.js"

// @koala-prepend "user/app.user.js"
// @koala-prepend "user/authController.js"
// @koala-prepend "user/loginController.js"
// @koala-prepend "user/registrationController.js"
// @koala-prepend "user/userModel.js"

(function () {
	angular.module('app', ['app.user', 'app.products', 'app.reviews', 'app.shared']);
})();
