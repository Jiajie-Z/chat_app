import {
  fetchRegister,
  fetchLogin,
  fetchLogout,
  fetchSession,
  fetchUsers,
  fetchMessages,
  connectSocket,
  disconnectSocket,
  sendSocketMessage,
} from './services';
import * as views from './views';

const state = {
  isLoggedIn: false,
  username: '',
  messagesList: [],
  usersList: {},
  errorMessage: '',
  authMode: 'login',
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
      views.register(state.errorMessage);
    } else {
      views.login(state.errorMessage);
    }
    return;
  }

  views.mainChat(state.username, state.usersList, state.messagesList);
}

function handleError(err, fallbackMessage = 'Something went wrong.') {
  if (err && err.error === 'auth-missing') {
    disconnectSocket();
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

function initializeSocket() {
  connectSocket(
    state.username,
    (messagesList) => {
      state.messagesList = messagesList || [];
      views.messages(state.messagesList);
    },
    (usersList) => {
      state.usersList = usersList || {};
      views.users(state.usersList);
    },
    (err) => {
      handleError(err, 'Socket error.');
    }
  );
}

function loadInitialChatData() {
  return Promise.all([
    fetchMessages().then((response) => {
      state.messagesList = response.messagesList || [];
    }),
    fetchUsers().then((response) => {
      state.usersList = response.usersList || {};
    }),
  ]);
}

function begin() {
  fetchSession()
    .then((response) => {
      if (response.username) {
        state.username = response.username;
        state.isLoggedIn = true;
        state.errorMessage = '';
        return loadInitialChatData();
      }
      return Promise.resolve();
    })
    .then(() => {
      render();
      if (state.username) {
        initializeSocket();
      }
    })
    .catch((err) => {
      if (err && err.error === 'auth-missing') {
        resetstate();
        render();
        return;
      }

      handleError(err, 'Failed to load session.');
    });
}

begin();

const appEl = document.querySelector('#chat-app');

appEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('login__button')) {
    e.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value;

    fetchLogin(username, password)
      .then((response) => {
        state.username = response.username;
        state.isLoggedIn = true;
        state.errorMessage = '';
        state.authMode = 'login';
        return loadInitialChatData();
      })
      .then(() => {
        render();
        initializeSocket();
      })
      .catch((err) => {
        handleError(err, 'Login failed. Please try again.');
      });

    return;
  }

  if (e.target.classList.contains('register__button')) {
    e.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value;

    fetchRegister(username, password)
      .then((response) => {
        state.username = response.username;
        state.isLoggedIn = true;
        state.errorMessage = '';
        state.authMode = 'login';
        return loadInitialChatData();
      })
      .then(() => {
        render();
        initializeSocket();
      })
      .catch((err) => {
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

    const messageInputEl = document.querySelector('.outgoing');
    const newMessage = messageInputEl.value.trim();

    if (!newMessage) {
      handleError({ error: 'required-message' }, 'Failed to send message.');
      return;
    }

    sendSocketMessage(state.username, newMessage)
      .then(() => {
        messageInputEl.value = '';
      })
      .catch((err) => {
        handleError(err, 'Failed to send message.');
      });

    return;
  }

  if (e.target.classList.contains('logout__button')) {
    e.preventDefault();

    fetchLogout()
      .then(() => {
        disconnectSocket();
        resetstate();
        render();
      })
      .catch((err) => {
        handleError(err, 'Logout failed.');
      });
  }
});