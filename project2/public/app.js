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
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchMessages: () => (/* binding */ fetchMessages),
/* harmony export */   fetchOutgoingMessage: () => (/* binding */ fetchOutgoingMessage),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchUsers: () => (/* binding */ fetchUsers)
/* harmony export */ });
/* harmony import */ var _views__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views */ "./src/views.js");

function fetchLogin(username) {
  _views__WEBPACK_IMPORTED_MODULE_0__.showLoadingIndicator(); // Show loading indicator before starting the fetch request

  return fetch('/api/session/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username
    })
  })["catch"](function (err) {
    _views__WEBPACK_IMPORTED_MODULE_0__.hideLoadingIndicator(); // Hide loading indicator on network error
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    _views__WEBPACK_IMPORTED_MODULE_0__.hideLoadingIndicator(); // Hide loading indicator when response is received
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    return response.json();
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
  return fetch('/api/session')["catch"](function () {
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
function fetchUsers() {
  return fetch('/api/users')["catch"](function (err) {
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
function fetchMessages() {
  _views__WEBPACK_IMPORTED_MODULE_0__.showLoadingIndicator();
  return fetch('/api/messages')["catch"](function (err) {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }
    _views__WEBPACK_IMPORTED_MODULE_0__.hideLoadingIndicator();
    return response.json();
  });
}
function fetchOutgoingMessage(message) {
  return fetch('/api/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      message: message
    })
  })["catch"](function (err) {
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

/***/ "./src/views.js":
/*!**********************!*\
  !*** ./src/views.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   error: () => (/* binding */ error),
/* harmony export */   hideLoadingIndicator: () => (/* binding */ hideLoadingIndicator),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   mainChat: () => (/* binding */ mainChat),
/* harmony export */   messages: () => (/* binding */ messages),
/* harmony export */   showLoadingIndicator: () => (/* binding */ showLoadingIndicator),
/* harmony export */   users: () => (/* binding */ users)
/* harmony export */ });
function mainChat(username, usersList, messagesList) {
  var appEl = document.querySelector('#chat-app');
  appEl.innerHTML = "\n        <div id=\"chat\">\n            <div id=\"welcome\">\n                <p>Hello, ".concat(username, "!</p>\n                <div id=\"logout\">\n                    <button class=\"logout__button\" type=\"submit\">Logout</button>\n                </div>\n            </div>\n            <div id=\"main\">\n                <div id=\"users\">\n                    ").concat(getUserList(usersList), "\n                </div>\n                <div id=\"messages\">\n                    ").concat(getMessageList(messagesList), "\n                </div>\n                <div id=\"outgoing\">\n                    ").concat(getOutgoingSection(), "  \n                </div>\n            </div>\n        </div>\n    ");
}
function login() {
  var appEl = document.querySelector('#chat-app');
  appEl.innerHTML = "\n        <div id=\"login\">\n            <h1>Chatting Room</h1>\n            <form class=\"login\">\n                <input id=\"username\" type=\"text\" placeholder=\"Enter your username\">\n                <button class=\"login__button\" type=\"submit\">Login</button>\n            </form>\n        </div>\n    ";
}
function getUserList(usersList) {
  return "<ul class=\"users\">" + Object.values(usersList).map(function (user) {
    return "\n            <li>\n               <div class=\"user\">\n                 <span class=\"username\">".concat(user, "</span>\n               </div>\n            </li>\n          ");
  }).join('') + "</ul>";
}
function getMessageList(messagesList) {
  return "<ol class=\"messages\">" + Object.values(messagesList).map(function (message) {
    return "\n            <li>\n                <div class=\"message\">\n                  <span class=\"username\">".concat(message.sender, ":").concat(message.text, "</span>\n                </div>\n            </li>\n        ");
  }).join('') + "</ol>";
}
function getOutgoingSection() {
  return "\n        <div>\n            <form>\n                <input class=\"outgoing\" name=\"text\" placeholder=\"Type your message...\"/></input>\n                <button class=\"send__button\" type=\"submit\">Send</button>\n            </form>\n        </div>\n    ";
}
function messages(messagesList) {
  var messagesEl = document.querySelector('#messages');
  messagesEl.innerHTML = getMessageList(messagesList);
}
function users(usersList) {
  var usersEl = document.querySelector('#users');
  usersEl.innerHTML = getUserList(usersList);
}
function error(errorMessage) {
  var appEl = document.querySelector('#chat-app');
  appEl.innerHTML = "\n        <div class=\"error__message>\n            <p id=\"error-message\">".concat(errorMessage, "</p>\n            <a href=\"/\">home page</a>\n        </div>\n    ");
}
function showLoadingIndicator() {
  var appEl = document.querySelector('#chat-app');
  var loadingIndicatorEl = "\n        <div class=\"loading-indicator\">\n            <div class=\"gg-spinner\"></div>\n        </div>\n    ";
  appEl.insertAdjacentHTML('beforeend', loadingIndicatorEl);
  document.querySelector('.loading-indicator').classList.add('visible');
}
function hideLoadingIndicator() {
  var spinner = document.querySelector('.loading-indicator');
  if (spinner) {
    spinner.classList.remove('visible');
  }
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _views__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./views */ "./src/views.js");


var state = {
  isLoggedIn: true,
  username: '',
  messagesList: '',
  usersList: '',
  errorMessage: ''
};
function resetstate() {
  state.isLoggedIn = true;
  state.username = '';
  state.messagesList = '';
  state.usersList = '';
  state.errorMessage = '';
}
function render() {
  if (state.errorMessage) {
    _views__WEBPACK_IMPORTED_MODULE_1__.error(state.errorMessage);
    state.errorMessage = '';
    return;
  }
  if (!state.username) {
    _views__WEBPACK_IMPORTED_MODULE_1__.login();
    return;
  }
  if (state.isLoggedIn) {
    setTimeout(function () {
      _views__WEBPACK_IMPORTED_MODULE_1__.mainChat(state.username, state.usersList, state.messagesList);
    }, 1500);
  }
}
function begin() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function (response) {
    if (response.username) {
      state.username = response.username;
      state.errorMessage = '';
      return Promise.all([refreshMessages(), refreshUsers()]);
    }
  })["catch"](function (err) {
    if (err && err.error === 'auth-missing') {
      resetstate();
    } else if (err.error === 'required-message') {
      state.errorMessage = 'input could not be empty';
    } else if (err.error === "required-username") {
      state.errorMessage = 'Username cannot contain special characters.';
    } else {
      state.errorMessage = 'Failed to login. Please try again.';
    }
  });
  render();
}
begin();
function refreshMessages() {
  return new Promise(function (resolve, reject) {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)().then(function (response) {
      if (!state.messagesList || state.messagesList.length < response.messagesList.length) {
        state.messagesList = response.messagesList;
        resolve('update');
      }
      resolve();
    })["catch"](function (err) {
      if (err && err.error === 'auth-missing') {
        resetstate();
      } else if (err.error === 'required-message') {
        state.errorMessage = 'input could not be empty';
      } else if (err.error === "required-username") {
        state.errorMessage = 'Username cannot contain special characters.';
      } else {
        state.errorMessage = 'Failed to login. Please try again.';
      }
      reject(err);
    });
  });
}
function refreshUsers() {
  return new Promise(function (resolve, reject) {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUsers)().then(function (response) {
      if (!state.usersList || JSON.stringify(state.usersList) !== JSON.stringify(response.usersList)) {
        state.usersList = response.usersList;
        resolve('update');
      }
      resolve();
    })["catch"](function (err) {
      if (err && err.error === 'auth-missing') {
        resetstate();
      } else if (err.error === 'required-message') {
        state.errorMessage = 'input could not be empty';
      } else if (err.error === "required-username") {
        state.errorMessage = 'Username cannot contain special characters.';
      } else {
        state.errorMessage = 'Failed to login. Please try again.';
      }
      reject(err);
    });
  });
}
function renderMessages() {
  refreshMessages().then(function (response) {
    if (response === 'update') {
      _views__WEBPACK_IMPORTED_MODULE_1__.messages(state.messagesList);
    }
  })["catch"](function (err) {
    if (err && err.error === 'auth-missing') {
      resetstate();
    } else if (err.error === 'required-message') {
      state.errorMessage = 'input could not be empty';
    } else if (err.error === "required-username") {
      state.errorMessage = 'Username cannot contain special characters.';
    } else {
      state.errorMessage = 'Failed to login. Please try again.';
    }
    render();
  });
}
function reRender() {
  if (state.username) {
    renderMessages();
    renderUsers();
  }
  setTimeout(reRender, 5000);
}
reRender();
function renderUsers() {
  refreshUsers().then(function (response) {
    if (response === 'update') {
      _views__WEBPACK_IMPORTED_MODULE_1__.users(state.usersList);
    }
  })["catch"](function (err) {
    if (err && err.error === 'auth-missing') {
      resetstate();
    } else if (err.error === 'required-message') {
      state.errorMessage = 'input could not be empty';
    } else if (err.error === "required-username") {
      state.errorMessage = 'Username cannot contain special characters.';
    } else {
      state.errorMessage = 'Failed to login. Please try again.';
    }
    render();
  });
}
var appEl = document.querySelector('#chat-app');
appEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('login__button')) {
    e.preventDefault();
    var username = document.querySelector('#username').value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (response) {
      state.username = response.username;
      return Promise.all([refreshMessages(), refreshUsers()]);
    }).then(function () {
      render();
    })["catch"](function (err) {
      if (err && err.error === 'auth-missing') {
        resetstate();
      } else if (err.error === 'required-message') {
        state.errorMessage = 'input could not be empty';
      } else if (err.error === "required-username") {
        state.errorMessage = 'Username cannot contain special characters.';
      } else {
        state.errorMessage = 'Failed to login. Please try again.';
      }
    });
    render();
    return;
  }
  if (e.target.classList.contains('send__button')) {
    e.preventDefault();
    var messageInputEl = document.querySelector('.outgoing');
    var newMessage = messageInputEl.value;
    if (newMessage) {
      (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchOutgoingMessage)(newMessage).then(function (response) {
        if (response.username !== state.username) {
          resetstate();
          return;
        }
        return Promise.all([refreshMessages(), refreshUsers()]);
      }).then(function () {
        render();
      })["catch"](function (err) {
        if (err && err.error === 'auth-missing') {
          resetstate();
        } else if (err.error === 'required-message') {
          state.errorMessage = 'input could not be empty';
        } else if (err.error === "required-username") {
          state.errorMessage = 'Username cannot contain special characters.';
        } else {
          state.errorMessage = 'Failed to login. Please try again.';
        }
      });
      render();
    }
    return;
  }
  if (e.target.classList.contains('logout__button')) {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function (response) {
      resetstate();
    }).then(function () {
      render();
    })["catch"](function (err) {
      if (err && err.error !== 'auth-missing') {
        if (err.error === 'required-message') {
          state.errorMessage = 'input could not be empty';
        } else if (err.error === "required-username") {
          state.errorMessage = 'Username cannot contain special characters.';
        } else {
          state.errorMessage = 'Failed to login. Please try again.';
        }
      }
    });
    render();
  }
});
})();

/******/ })()
;
//# sourceMappingURL=app.js.map