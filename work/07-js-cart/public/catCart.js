/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cart.js":
/*!*********************!*\
  !*** ./src/cart.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initCart: () => (/* binding */ initCart)
/* harmony export */ });
/* harmony import */ var _product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product */ "./src/product.js");

var cart = {};
function initCart() {
  var viewCartBtn = document.querySelector('.view-cart-btn');
  var cartContainer = document.querySelector('.cart-container');
  var hideCartBtn = document.querySelector('.hide-cart-btn');
  var checkoutBtn = document.querySelector('.checkout-btn');
  document.querySelector('.products').addEventListener('click', function (e) {
    if (e.target.classList.contains('add-to-cart')) {
      var productId = e.target.getAttribute('data-id');
      addToCart(parseInt(productId));
      updateCartCount();
      renderCart();
    }
  });
  viewCartBtn.addEventListener('click', function () {
    viewCartBtn.classList.add('hidden');
    viewCartBtn.classList.remove('visible');
    hideCartBtn.classList.remove('hidden');
    hideCartBtn.classList.add('visible');
    cartContainer.style.display = 'block';
    renderCart();
  });
  hideCartBtn.addEventListener('click', function () {
    hideCartBtn.classList.remove('visible');
    hideCartBtn.classList.add('hidden');
    viewCartBtn.classList.remove('hidden');
    cartContainer.style.display = 'none';
  });
  checkoutBtn.addEventListener('click', function () {
    cart = {};
    renderCart();
    hideCartBtn.classList.add('hidden');
    hideCartBtn.classList.remove('visible');
    viewCartBtn.classList.remove('hidden');
    cartContainer.classList.add('hidden');
    cartContainer.style.display = 'none';
    updateCartCount();
  });
  updateCartCount();
}
function addToCart(productId) {
  if (cart[productId]) {
    cart[productId]++;
  } else {
    cart[productId] = 1;
  }
}
function renderCart() {
  var cartItems = document.querySelector('.cart-items');
  cartItems.innerHTML = '';
  var totalCartPrice = Object.keys(cart).reduce(function (total, productId) {
    var quantity = cart[productId];
    var product = (0,_product__WEBPACK_IMPORTED_MODULE_0__.getProductById)(parseInt(productId));
    if (quantity > 0) {
      var itemTotal = (product.price * quantity).toFixed(2);
      var itemElement = document.createElement('div');
      itemElement.innerHTML = "\n        <div class=\"cart-item\">\n          <img class=\"cart__image\" src=\"".concat(product.imgUrl, "\" alt=\"").concat(product.name, "\" />\n          <p>").concat(product.name, " - $").concat(product.price.toFixed(2), " x ").concat(quantity, " = $").concat(itemTotal, "</p>\n          <input type=\"text\" min=\"1\" value=\"").concat(quantity, "\" class=\"cart-quantity\" data-id=\"").concat(product.id, "\">\n        </div>\n      ");
      cartItems.appendChild(itemElement);
      return total + parseFloat(itemTotal);
    }
    return total;
  }, 0);
  if (totalCartPrice > 0) {
    var totalElement = document.createElement('div');
    totalElement.innerHTML = "<h3>Total: $".concat(totalCartPrice.toFixed(2), "</h3>");
    cartItems.appendChild(totalElement);
  } else {
    cartItems.innerHTML = '<p>Nothing in the cart</p>';
  }
  document.querySelector('.cart-items').addEventListener('change', function (e) {
    if (e.target.classList.contains('cart-quantity')) {
      var productId = parseInt(e.target.getAttribute('data-id'));
      var newQuantity = parseInt(e.target.value);
      updateCart(productId, newQuantity);
      renderCart();
      updateCartCount();
    }
  });
}
function updateCart(productId, quantity) {
  if (quantity <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = quantity;
  }
}
function updateCartCount() {
  var totalItems = Object.values(cart).reduce(function (sum, quantity) {
    return sum + quantity;
  }, 0);
  var viewCartBtn = document.querySelector('.view-cart-btn');
  if (totalItems > 0) {
    viewCartBtn.textContent = "View Cart (".concat(totalItems, ")");
  } else {
    viewCartBtn.textContent = 'View Cart';
  }
}

/***/ }),

/***/ "./src/product.js":
/*!************************!*\
  !*** ./src/product.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getProductById: () => (/* binding */ getProductById),
/* harmony export */   renderProducts: () => (/* binding */ renderProducts)
/* harmony export */ });
var products = [{
  id: 1,
  name: 'Jorts',
  price: 0.99,
  imgUrl: 'http://placehold.co/150x150?text=Jorts'
}, {
  id: 2,
  name: 'Jean',
  price: 3.14,
  imgUrl: 'http://placehold.co/150x150?text=Jean'
}, {
  id: 3,
  name: 'Nyancat',
  price: 2.73,
  imgUrl: 'http://placehold.co/150x150?text=Nyancat'
}];
function getProductById(id) {
  return products.find(function (product) {
    return product.id === id;
  });
}
function renderProducts() {
  var productList = document.querySelector('.products');
  products.forEach(function (product) {
    var productElement = document.createElement('div');
    productElement.innerHTML = "\n      <div class=\"product-item\">\n        <img src=\"".concat(product.imgUrl, "\" alt=\"").concat(product.name, "\" />\n        <p>").concat(product.name, " - $").concat(product.price.toFixed(2), "</p>\n        <button class=\"add-to-cart button\" data-id=\"").concat(product.id, "\">Add to Cart</button>\n      </div>\n    ");
    productList.appendChild(productElement);
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _product__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product */ "./src/product.js");
/* harmony import */ var _cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart */ "./src/cart.js");


document.addEventListener('DOMContentLoaded', function () {
  (0,_product__WEBPACK_IMPORTED_MODULE_0__.renderProducts)();
  (0,_cart__WEBPACK_IMPORTED_MODULE_1__.initCart)();
});
})();

/******/ })()
;
//# sourceMappingURL=catCart.js.map