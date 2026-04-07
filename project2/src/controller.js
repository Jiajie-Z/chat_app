import {
  fetchRegister,
  fetchLogin,
  fetchLogout,
  fetchSession,
  fetchUsers,
  fetchMessages,
  fetchOutgoingMessage,
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
  return fetchMessages().then((response) => {
    const nextMessages = response.messagesList || [];
    const hasChanged =
      JSON.stringify(state.messagesList) !== JSON.stringify(nextMessages);

    state.messagesList = nextMessages;
    return hasChanged ? 'update' : '';
  });
}

function refreshUsers() {
  return fetchUsers().then((response) => {
    const nextUsers = response.usersList || {};
    const hasChanged =
      JSON.stringify(state.usersList) !== JSON.stringify(nextUsers);

    state.usersList = nextUsers;
    return hasChanged ? 'update' : '';
  });
}

function renderMessages() {
  refreshMessages()
    .then((status) => {
      if (status === 'update') {
        views.messages(state.messagesList);
      }
    })
    .catch((err) => {
      handleError(err, 'Failed to refresh messages.');
    });
}

function renderUsers() {
  refreshUsers()
    .then((status) => {
      if (status === 'update') {
        views.users(state.usersList);
      }
    })
    .catch((err) => {
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
  fetchSession()
    .then((response) => {
      if (response.username) {
        state.username = response.username;
        state.isLoggedIn = true;
        state.errorMessage = '';
        return Promise.all([refreshMessages(), refreshUsers()]);
      }
      return Promise.resolve();
    })
    .then(() => {
      render();
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
reRender();

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
        return Promise.all([refreshMessages(), refreshUsers()]);
      })
      .then(() => {
        render();
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
        return Promise.all([refreshMessages(), refreshUsers()]);
      })
      .then(() => {
        render();
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

    fetchOutgoingMessage(newMessage)
      .then((response) => {
        if (response.username !== state.username) {
          resetstate();
          render();
          return Promise.reject({ error: 'auth-missing' });
        }

        messageInputEl.value = '';
        return Promise.all([refreshMessages(), refreshUsers()]);
      })
      .then(() => {
        views.messages(state.messagesList);
        views.users(state.usersList);
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
        resetstate();
        render();
      })
      .catch((err) => {
        handleError(err, 'Logout failed.');
      });
  }
});