// @koala-prepend "product/product.module.js"
// @koala-prepend "product/ProductModel.js"
// @koala-prepend "product/ProductController.js"
// @koala-prepend "product/ReviewModel.js"

// @koala-prepend "user/user.module.js"
// @koala-prepend "user/UserModel.js"
// @koala-prepend "user/UserService.js"
// @koala-prepend "user/AuthController.js"
// @koala-prepend "user/LoginController.js"
// @koala-prepend "user/RegistrationController.js"

// @koala-prepend "shared/shared.module.js"
// @koala-prepend "shared/StateManager.js"

// @koala-prepend "root.js"

$(function () {
	$('body').on('click', '.fancybox', function () {
		var $this = $(this);
		$.fancybox.close();
		$.fancybox.open({src: $this.data('src')}, {
            touch: false,
            keyboard: false,
            focus: false
        });
	});
});
