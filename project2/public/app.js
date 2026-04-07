/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js"
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchMessages: () => (/* binding */ fetchMessages),
/* harmony export */   fetchOutgoingMessage: () => (/* binding */ fetchOutgoingMessage),
/* harmony export */   fetchRegister: () => (/* binding */ fetchRegister),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchUsers: () => (/* binding */ fetchUsers)
/* harmony export */ });
/* harmony import */ var _views__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./views */ "./src/views.js");

function fetchRegister(username, password) {
  return fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
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
function fetchLogin(username, password) {
  return fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
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

/***/ },

/***/ "./src/views.js"
/*!**********************!*\
  !*** ./src/views.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   error: () => (/* binding */ error),
/* harmony export */   hideLoadingIndicator: () => (/* binding */ hideLoadingIndicator),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   mainChat: () => (/* binding */ mainChat),
/* harmony export */   messages: () => (/* binding */ messages),
/* harmony export */   register: () => (/* binding */ register),
/* harmony export */   showLoadingIndicator: () => (/* binding */ showLoadingIndicator),
/* harmony export */   users: () => (/* binding */ users)
/* harmony export */ });
function mainChat(username, usersList, messagesList) {
  var appEl = document.querySelector('#chat-app');
  appEl.innerHTML = "\n    <div id=\"chat\">\n      <div id=\"welcome\">\n        <p>Hello, ".concat(username, "!</p>\n        <div id=\"logout\">\n          <button class=\"logout__button\" type=\"button\">Logout</button>\n        </div>\n      </div>\n      <div id=\"main\">\n        <div id=\"users\">\n          ").concat(getUserList(usersList), "\n        </div>\n        <div id=\"messages\">\n          ").concat(getMessageList(messagesList), "\n        </div>\n      </div>\n      <div id=\"outgoing\">\n        ").concat(getOutgoingSection(), "\n      </div>\n    </div>\n  ");
}
function login() {
  var errorMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var appEl = document.querySelector('#chat-app');
  appEl.innerHTML = "\n    <div id=\"login\">\n      <h1>Chatting Room</h1>\n      ".concat(errorMessage ? "<p class=\"form-error\">".concat(errorMessage, "</p>") : '', "\n      <form class=\"login-form\">\n        <label for=\"username\" class=\"login-form__label\">Username</label>\n        <input\n          id=\"username\"\n          type=\"text\"\n          class=\"login-form__input\"\n          placeholder=\"Enter your username\"\n        />\n\n        <label for=\"password\" class=\"login-form__label\">Password</label>\n        <input\n          id=\"password\"\n          type=\"password\"\n          class=\"login-form__input\"\n          placeholder=\"Enter your password\"\n        />\n\n        <div class=\"login-form__actions\">\n          <button class=\"login__button\" type=\"submit\">Login</button>\n          <button class=\"go-to-register__button\" type=\"button\">Go to Register</button>\n        </div>\n      </form>\n    </div>\n  ");
}
function register() {
  var errorMessage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var appEl = document.querySelector('#chat-app');
  appEl.innerHTML = "\n    <div id=\"login\">\n      <h1>Register</h1>\n      ".concat(errorMessage ? "<p class=\"form-error\">".concat(errorMessage, "</p>") : '', "\n      <form class=\"register-form\">\n        <label for=\"username\" class=\"login-form__label\">Username</label>\n        <input\n          id=\"username\"\n          type=\"text\"\n          class=\"login-form__input\"\n          placeholder=\"Choose a username\"\n        />\n\n        <label for=\"password\" class=\"login-form__label\">Password</label>\n        <input\n          id=\"password\"\n          type=\"password\"\n          class=\"login-form__input\"\n          placeholder=\"Choose a password\"\n        />\n\n        <div class=\"login-form__actions\">\n          <button class=\"register__button\" type=\"submit\">Register</button>\n          <button class=\"back-to-login__button\" type=\"button\">Back to Login</button>\n        </div>\n      </form>\n    </div>\n  ");
}
function getUserList() {
  var usersList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return "\n    <ul class=\"users\">\n      ".concat(Object.values(usersList).map(function (user) {
    return "\n        <li>\n          <div class=\"user\">\n            <span class=\"username\">".concat(user, "</span>\n          </div>\n        </li>\n      ");
  }).join(''), "\n    </ul>\n  ");
}
function getMessageList() {
  var messagesList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return "\n    <ol class=\"messages\">\n      ".concat(Object.values(messagesList).map(function (message) {
    return "\n        <li>\n          <div class=\"message\">\n            <span class=\"message__sender\">".concat(message.sender, ":</span>\n            <span class=\"message__text\">").concat(message.text, "</span>\n          </div>\n        </li>\n      ");
  }).join(''), "\n    </ol>\n  ");
}
function getOutgoingSection() {
  return "\n    <form class=\"outgoing-form\">\n      <label for=\"outgoing-message\" class=\"visually-hidden\">Message</label>\n      <input\n        id=\"outgoing-message\"\n        class=\"outgoing\"\n        name=\"text\"\n        type=\"text\"\n        placeholder=\"Type your message...\"\n      />\n      <button class=\"send__button\" type=\"submit\">Send</button>\n    </form>\n  ";
}
function messages(messagesList) {
  var messagesEl = document.querySelector('#messages');
  if (messagesEl) {
    messagesEl.innerHTML = getMessageList(messagesList);
  }
}
function users(usersList) {
  var usersEl = document.querySelector('#users');
  if (usersEl) {
    usersEl.innerHTML = getUserList(usersList);
  }
}
function error(errorMessage) {
  var appEl = document.querySelector('#chat-app');
  appEl.innerHTML = "\n    <div class=\"error__message\">\n      <p id=\"error-message\">".concat(errorMessage, "</p>\n      <button class=\"back-to-login__button\" type=\"button\">Back to login</button>\n    </div>\n  ");
}
function showLoadingIndicator() {
  var appEl = document.querySelector('#chat-app');
  var existing = document.querySelector('.loading-indicator');
  if (existing) {
    existing.classList.add('visible');
    return;
  }
  var loadingIndicatorEl = "\n    <div class=\"loading-indicator visible\">\n      <div class=\"gg-spinner\"></div>\n    </div>\n  ";
  appEl.insertAdjacentHTML('beforeend', loadingIndicatorEl);
}
function hideLoadingIndicator() {
  var spinner = document.querySelector('.loading-indicator');
  if (spinner) {
    spinner.classList.remove('visible');
  }
}


/***/ }

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
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
  isLoggedIn: false,
  username: '',
  messagesList: [],
  usersList: {},
  errorMessage: '',
  authMode: 'login'
};
function resetstate() {
  state.isLoggedIn = false;
  state.username = '';
  state.messagesList = [];
  state.usersList = {};
  state.errorMessage = '';
  state.authMode = 'login';
}
function render() {
  if (!state.username) {
    if (state.authMode === 'register') {
      _views__WEBPACK_IMPORTED_MODULE_1__.register(state.errorMessage);
    } else {
      _views__WEBPACK_IMPORTED_MODULE_1__.login(state.errorMessage);
    }
    return;
  }
  _views__WEBPACK_IMPORTED_MODULE_1__.mainChat(state.username, state.usersList, state.messagesList);
}
function handleError(err) {
  var fallbackMessage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Something went wrong.';
  if (err && err.error === 'auth-missing') {
    resetstate();
    render();
    return;
  }
  if (err && err.error === 'invalid-username') {
    state.errorMessage = 'Username format is invalid.';
  } else if (err && err.error === 'invalid-password') {
    state.errorMessage = 'Password must be at least 6 characters.';
  } else if (err && err.error === 'user-not-found') {
    state.errorMessage = 'User does not exist. Please register first.';
  } else if (err && err.error === 'invalid-credentials') {
    state.errorMessage = 'Incorrect username or password.';
  } else if (err && err.error === 'username-exists') {
    state.errorMessage = 'That username is already taken.';
  } else if (err && err.error === 'required-message') {
    state.errorMessage = 'Message cannot be empty.';
  } else if (err && err.error === 'network-error') {
    state.errorMessage = 'Network error. Please try again.';
  } else {
    state.errorMessage = fallbackMessage;
  }
  render();
}
function refreshMessages() {
  return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchMessages)().then(function (response) {
    var nextMessages = response.messagesList || [];
    var hasChanged = JSON.stringify(state.messagesList) !== JSON.stringify(nextMessages);
    state.messagesList = nextMessages;
    return hasChanged ? 'update' : '';
  });
}
function refreshUsers() {
  return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchUsers)().then(function (response) {
    var nextUsers = response.usersList || {};
    var hasChanged = JSON.stringify(state.usersList) !== JSON.stringify(nextUsers);
    state.usersList = nextUsers;
    return hasChanged ? 'update' : '';
  });
}
function renderMessages() {
  refreshMessages().then(function (status) {
    if (status === 'update') {
      _views__WEBPACK_IMPORTED_MODULE_1__.messages(state.messagesList);
    }
  })["catch"](function (err) {
    handleError(err, 'Failed to refresh messages.');
  });
}
function renderUsers() {
  refreshUsers().then(function (status) {
    if (status === 'update') {
      _views__WEBPACK_IMPORTED_MODULE_1__.users(state.usersList);
    }
  })["catch"](function (err) {
    handleError(err, 'Failed to refresh users.');
  });
}
function reRender() {
  if (state.username) {
    renderMessages();
    renderUsers();
  }
  setTimeout(reRender, 5000);
}
function begin() {
  (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchSession)().then(function (response) {
    if (response.username) {
      state.username = response.username;
      state.isLoggedIn = true;
      state.errorMessage = '';
      return Promise.all([refreshMessages(), refreshUsers()]);
    }
    return Promise.resolve();
  }).then(function () {
    render();
  })["catch"](function (err) {
    if (err && err.error === 'auth-missing') {
      resetstate();
      render();
      return;
    }
    handleError(err, 'Failed to load session.');
  });
}
begin();
reRender();
var appEl = document.querySelector('#chat-app');
appEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('login__button')) {
    e.preventDefault();
    var username = document.querySelector('#username').value.trim();
    var password = document.querySelector('#password').value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username, password).then(function (response) {
      state.username = response.username;
      state.isLoggedIn = true;
      state.errorMessage = '';
      state.authMode = 'login';
      return Promise.all([refreshMessages(), refreshUsers()]);
    }).then(function () {
      render();
    })["catch"](function (err) {
      handleError(err, 'Login failed. Please try again.');
    });
    return;
  }
  if (e.target.classList.contains('register__button')) {
    e.preventDefault();
    var _username = document.querySelector('#username').value.trim();
    var _password = document.querySelector('#password').value;
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchRegister)(_username, _password).then(function (response) {
      state.username = response.username;
      state.isLoggedIn = true;
      state.errorMessage = '';
      state.authMode = 'login';
      return Promise.all([refreshMessages(), refreshUsers()]);
    }).then(function () {
      render();
    })["catch"](function (err) {
      handleError(err, 'Registration failed. Please try again.');
    });
    return;
  }
  if (e.target.classList.contains('go-to-register__button')) {
    e.preventDefault();
    state.errorMessage = '';
    state.authMode = 'register';
    render();
    return;
  }
  if (e.target.classList.contains('back-to-login__button')) {
    e.preventDefault();
    state.errorMessage = '';
    state.authMode = 'login';
    render();
    return;
  }
  if (e.target.classList.contains('send__button')) {
    e.preventDefault();
    var messageInputEl = document.querySelector('.outgoing');
    var newMessage = messageInputEl.value.trim();
    if (!newMessage) {
      handleError({
        error: 'required-message'
      }, 'Failed to send message.');
      return;
    }
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchOutgoingMessage)(newMessage).then(function (response) {
      if (response.username !== state.username) {
        resetstate();
        render();
        return Promise.reject({
          error: 'auth-missing'
        });
      }
      messageInputEl.value = '';
      return Promise.all([refreshMessages(), refreshUsers()]);
    }).then(function () {
      _views__WEBPACK_IMPORTED_MODULE_1__.messages(state.messagesList);
      _views__WEBPACK_IMPORTED_MODULE_1__.users(state.usersList);
    })["catch"](function (err) {
      handleError(err, 'Failed to send message.');
    });
    return;
  }
  if (e.target.classList.contains('logout__button')) {
    e.preventDefault();
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)().then(function () {
      resetstate();
      render();
    })["catch"](function (err) {
      handleError(err, 'Logout failed.');
    });
  }
});
})();

/******/ })()
;
//# sourceMappingURL=app.js.map