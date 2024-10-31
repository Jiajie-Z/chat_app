/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkSession: () => (/* binding */ checkSession),
/* harmony export */   setupEventListeners: () => (/* binding */ setupEventListeners)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../users */ "./users.js");
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_users__WEBPACK_IMPORTED_MODULE_2__);



var state = {
  isLoggedIn: false,
  username: '',
  storedWord: '',
  errorMessage: ''
};
function setupEventListeners() {
  var appDiv = document.getElementById('app');
  appDiv.addEventListener('click', function (e) {
    if (e.target.classList.contains('logout')) {
      logout();
    }
  });
  appDiv.addEventListener('submit', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('login__form')) {
      var username = e.target.querySelector('.input__box').value.trim();
      if (!(0,_users__WEBPACK_IMPORTED_MODULE_2__.isValidUsername)(username)) {
        state.errorMessage = 'Username can only contain letters, numbers, and underscores.';
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(state);
        return;
      }
      login(username);
    }
    if (e.target.classList.contains('word__form')) {
      var newWord = e.target.querySelector('.input__box').value.trim();
      checkSession().then(function () {
        updateUserWord(newWord);
      })["catch"](function () {
        state.isLoggedIn = false;
        (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(state);
      });
    }
  });
}
function login(username) {
  return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (data) {
    state.isLoggedIn = true;
    state.username = data.username;
    state.errorMessage = '';
    return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchStoredWord)();
  }).then(function (data) {
    state.storedWord = data.storedWord;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(state);
  })["catch"](function (error) {
    if (error.error === 'auth-insufficient') {
      state.errorMessage = 'Dogs are not welcome here';
    } else if (error.error === 'required-username') {
      state.errorMessage = 'Username cannot contain special characters.';
    } else {
      state.errorMessage = 'Login failed. Please try again.';
    }
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(state);
    return Promise.reject(errorMessage);
  });
}
function logout() {
  return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
    state.isLoggedIn = false;
    state.username = '';
    state.storedWord = '';
    state.errorMessage = '';
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(state);
  })["catch"](function () {
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(state);
    return Promise.reject('Logout failed');
  });
}
function checkSession() {
  return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function (data) {
    state.isLoggedIn = true;
    state.username = data.username;
    return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchStoredWord)();
  }).then(function (data) {
    state.storedWord = data.storedWord;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(state);
  })["catch"](function () {
    state.isLoggedIn = false;
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(state);
    return Promise.reject();
  });
}
function updateUserWord(newWord) {
  if (!(0,_users__WEBPACK_IMPORTED_MODULE_2__.isValidWord)(newWord)) {
    state.errorMessage = 'Only letters are allowed.';
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(state);
    return;
  }
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.updateStoredWord)(newWord).then(function (data) {
    state.storedWord = data.storedWord;
    state.errorMessage = '';
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(state);
  })["catch"](function (error) {
    if (error.error === 'auth-missing') {
      state.isLoggedIn = false;
      state.errorMessage = '';
    } else if (error.error === 'invalid-word') {
      state.errorMessage = 'Only letters are allowed.';
    } else if (error.error === "required-word") {
      state.errorMessage = 'input can not be empty.';
    } else {
      state.errorMessage = 'Failed to update word. Please try again.';
    }
    (0,_render__WEBPACK_IMPORTED_MODULE_1__.render)(state);
  });
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
function render(state) {
  var appDiv = document.getElementById('app');
  if (state.isLoggedIn) {
    appDiv.innerHTML = "\n            <div>\n                <h2 class=\"header\">Welcome, ".concat(state.username, "</h2>\n                <p>Your stored word: ").concat(state.storedWord, "</p>\n                <form class=\"word__form\">\n                    <input class=\"input__box\" type=\"text\" placeholder=\"Enter a new word\" />\n                    <button class=\"button\" type=\"submit\">Update Word</button>\n                </form>\n                <button class=\"logout button\">Logout</button>\n                ").concat(state.errorMessage ? "<p class=\"error-message\">".concat(state.errorMessage, "</p>") : '', "\n            </div>\n        ");
  } else {
    appDiv.innerHTML = "\n            <div>\n                <h2 class=\"header\">Login</h2>\n                <form class=\"login__form\">\n                    <input class=\"input__box\" type=\"text\" placeholder=\"Username\" />\n                    <button class=\"button\" type=\"submit\">Login</button>\n                </form>    \n                ".concat(state.errorMessage ? "<p class=\"error-message\">".concat(state.errorMessage, "</p>") : '', "\n            </div>\n        ");
  }
}

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchStoredWord: () => (/* binding */ fetchStoredWord),
/* harmony export */   updateStoredWord: () => (/* binding */ updateStoredWord)
/* harmony export */ });
// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions

function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json' // set this header when sending JSON in the body of request
    },
    body: JSON.stringify({
      username: username
    })
  })
  // fetch() rejects on network error
  // So we convert that to a formatted error object
  // so our caller can handle all "errors" in a similar way
  ["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      // response.ok checks the status code from the service
      // This service returns JSON on errors,
      // so we use that as the error object and reject
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json(); // happy status code means resolve with data from service
  });
}
function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return Promise.reject({
        error: 'logout-failed'
      });
    }
    return response.json();
  });
}
function fetchSession() {
  return fetch('/api/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return Promise.reject({
        error: 'auth-missing'
      });
    }
    return response.json();
  });
}
function fetchStoredWord() {
  return fetch('/api/word', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}
function updateStoredWord(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      word: word
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

/***/ }),

/***/ "./users.js":
/*!******************!*\
  !*** ./users.js ***!
  \******************/
/***/ ((module) => {

// Odd naming on "wordFor"?
// This is chosen to make the use of it read more naturally:
// `wordFor[username] = word;`
//
// Some teams will embrace that, others will want a more rigidly consistent style

var wordFor = {};

// We could have some functions to abstract the storage of words
// Similar to how sessions.js never exports the sessions object

// I've exported the wordFor object instead because our use is so simple
// - different people in the industry have different views on when is the
// best time to put a layer of abstraction around data

function isValidUsername(username) {
  var isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}
function isValidWord(word) {
  var isValid = true;
  isValid = isValid && word.match(/^[A-Za-z]*$/);
  return isValid;
}
module.exports = {
  isValidUsername: isValidUsername,
  isValidWord: isValidWord,
  wordFor: wordFor
};

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/controller.js");

document.addEventListener('DOMContentLoaded', function () {
  (0,_controller__WEBPACK_IMPORTED_MODULE_0__.setupEventListeners)();
  (0,_controller__WEBPACK_IMPORTED_MODULE_0__.checkSession)();
});
})();

/******/ })()
;
//# sourceMappingURL=app.js.map