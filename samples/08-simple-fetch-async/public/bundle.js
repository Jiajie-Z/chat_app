/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchCatDetails: () => (/* binding */ fetchCatDetails),
/* harmony export */   fetchCatList: () => (/* binding */ fetchCatList)
/* harmony export */ });
// No "use strict" or IIFE is needed, because webpack/babel do that for us!

// named export
function fetchCatList() {
  // Return a promise of parsed results or error object
  return fetch("/cats") // Using a relative url so we use the existing current page domain + protocol
  ["catch"](function () {
    // network error is rejected promise
    return Promise.reject({
      error: 'networkError'
    }); // We return rejected promise with an error object!
  }).then(function (response) {
    if (!response.ok) {
      // Some sort of error status code
      return response.json().then(function (info) {
        return Promise.reject(info);
      }); // We return rejected promise with parsed error object
    }
    return response.json(); // Parse the successful response data
  });
  // Using any successful data is done by the caller, not by this function
  // - Keeps this function reusable and decoupled from the consumption of the results
}
;

// named export
function fetchCatDetails(name) {
  // Return a promise of parsed results or error object
  return fetch("/cats/".concat(name)) // Using a relative url so we use the existing current page domain + protocol
  ["catch"](function () {
    // network error is rejected promise
    return Promise.reject({
      error: 'networkError'
    }); // We return rejected promise with an error object!
  }).then(function (response) {
    if (!response.ok) {
      // Some sort of error status code
      return response.json().then(function (info) {
        return Promise.reject(info);
      }); // We return rejected promise with parsed error object
    }
    return response.json(); // Parse the successful response data
  });
  // Using any successful data is done by the caller, not by this function
  // - Keeps this function reusable and decoupled from the consumption of the results
}
;

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var state = {
  cats: {}
};
state.updateCats = function (catsData) {
  var cats = {}; // replacement object
  catsData.forEach(function (name) {
    cats[name] = _objectSpread({
      name: name
    }, state.cats[name]); // copies existing data for this cat
  });
  state.cats = cats; // replaces previous data for all cats
};
state.updateCat = function (catData) {
  var name = catData.name;
  state.cats[name] = catData;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// No "use strict" or IIFE is needed, because webpack/babel do that for us!

function render(state, rootEl) {
  var cats = state.cats; // Destructure cats property from state into new variable
  var html = generateCatCardsHtml(cats);
  rootEl.innerHTML = html;
}
function generateCatCardsHtml(cats) {
  var listHtml = Object.keys(cats).map(function (name) {
    return "\n      <li class=\"card\">\n          ".concat(generateCatCardHtml(cats[name]), "\n        </button>\n      </li>\n    ");
  }).join('');
  return "\n    <ul class=\"cards\">\n      ".concat(listHtml, "\n    </ul>\n  ");
}
function generateCatCardHtml(cat) {
  var ageHtml = cat.age ? "<span class=\"card__age\">Age: ".concat(cat.age, "</span>") : "";
  var colorHtml = cat.color ? "<span class=\"card__color\">Color: ".concat(cat.color, "</span>") : "";
  var buttonHtml = cat.age ? '' : "<button class=\"card__load\" data-name=\"".concat(cat.name, "\">Load</button>");
  var html = "\n    <h2 class=\"card__name\">".concat(cat.name, "</h2>\n    ").concat(ageHtml, "\n    ").concat(colorHtml, "\n    ").concat(buttonHtml, "\n  ");
  return html;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

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
/*!*********************!*\
  !*** ./src/cats.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ "./src/view.js");
// No "use strict" or IIFE is needed, because webpack/babel do that for us!




var rootEl = document.querySelector('.main');
rootEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('card__load')) {
    var name = e.target.dataset.name;
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchCatDetails)(name).then(function (catData) {
      _state__WEBPACK_IMPORTED_MODULE_0__["default"].updateCat(catData);
      (0,_view__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
    })["catch"](function (error) {
      // Don't blindly copy this! You need to do proper error reporting
      console.warn("replace this with actual error reporting", error);
    });
  }
});

// Below runs on load
(0,_services__WEBPACK_IMPORTED_MODULE_1__.fetchCatList)().then(function (cats) {
  _state__WEBPACK_IMPORTED_MODULE_0__["default"].updateCats(cats);
  (0,_view__WEBPACK_IMPORTED_MODULE_2__["default"])(_state__WEBPACK_IMPORTED_MODULE_0__["default"], rootEl);
})["catch"](function (error) {
  // Don't blindly copy this! You need to do proper error reporting
  console.warn("replace this with actual error reporting", error);
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map