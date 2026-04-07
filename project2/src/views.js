function mainChat(username, usersList, messagesList) {
  const appEl = document.querySelector('#chat-app');

  appEl.innerHTML = `
    <div id="chat">
      <div id="welcome">
        <p>Hello, ${username}!</p>
        <div id="logout">
          <button class="logout__button" type="button">Logout</button>
        </div>
      </div>
      <div id="main">
        <div id="users">
          ${getUserList(usersList)}
        </div>
        <div id="messages">
          ${getMessageList(messagesList)}
        </div>
      </div>
      <div id="outgoing">
        ${getOutgoingSection()}
      </div>
    </div>
  `;
}

function login(errorMessage = '') {
  const appEl = document.querySelector('#chat-app');
  appEl.innerHTML = `
    <div id="login">
      <h1>Chatting Room</h1>
      ${errorMessage ? `<p class="form-error">${errorMessage}</p>` : ''}
      <form class="login-form">
        <label for="username" class="login-form__label">Username</label>
        <input
          id="username"
          type="text"
          class="login-form__input"
          placeholder="Enter your username"
        />

        <label for="password" class="login-form__label">Password</label>
        <input
          id="password"
          type="password"
          class="login-form__input"
          placeholder="Enter your password"
        />

        <div class="login-form__actions">
          <button class="login__button" type="submit">Login</button>
          <button class="go-to-register__button" type="button">Go to Register</button>
        </div>
      </form>
    </div>
  `;
}

function register(errorMessage = '') {
  const appEl = document.querySelector('#chat-app');
  appEl.innerHTML = `
    <div id="login">
      <h1>Register</h1>
      ${errorMessage ? `<p class="form-error">${errorMessage}</p>` : ''}
      <form class="register-form">
        <label for="username" class="login-form__label">Username</label>
        <input
          id="username"
          type="text"
          class="login-form__input"
          placeholder="Choose a username"
        />

        <label for="password" class="login-form__label">Password</label>
        <input
          id="password"
          type="password"
          class="login-form__input"
          placeholder="Choose a password"
        />

        <div class="login-form__actions">
          <button class="register__button" type="submit">Register</button>
          <button class="back-to-login__button" type="button">Back to Login</button>
        </div>
      </form>
    </div>
  `;
}

function getUserList(usersList = {}) {
  return `
    <ul class="users">
      ${Object.values(usersList).map((user) => `
        <li>
          <div class="user">
            <span class="username">${user}</span>
          </div>
        </li>
      `).join('')}
    </ul>
  `;
}

function getMessageList(messagesList = []) {
  return `
    <ol class="messages">
      ${Object.values(messagesList).map((message) => `
        <li>
          <div class="message">
            <span class="message__sender">${message.sender}:</span>
            <span class="message__text">${message.text}</span>
          </div>
        </li>
      `).join('')}
    </ol>
  `;
}

function getOutgoingSection() {
  return `
    <form class="outgoing-form">
      <label for="outgoing-message" class="visually-hidden">Message</label>
      <input
        id="outgoing-message"
        class="outgoing"
        name="text"
        type="text"
        placeholder="Type your message..."
      />
      <button class="send__button" type="submit">Send</button>
    </form>
  `;
}

function messages(messagesList) {
  const messagesEl = document.querySelector('#messages');
  if (messagesEl) {
    messagesEl.innerHTML = getMessageList(messagesList);
  }
}

function users(usersList) {
  const usersEl = document.querySelector('#users');
  if (usersEl) {
    usersEl.innerHTML = getUserList(usersList);
  }
}

function error(errorMessage) {
  const appEl = document.querySelector('#chat-app');
  appEl.innerHTML = `
    <div class="error__message">
      <p id="error-message">${errorMessage}</p>
      <button class="back-to-login__button" type="button">Back to login</button>
    </div>
  `;
}

function showLoadingIndicator() {
  const appEl = document.querySelector('#chat-app');
  const existing = document.querySelector('.loading-indicator');

  if (existing) {
    existing.classList.add('visible');
    return;
  }

  const loadingIndicatorEl = `
    <div class="loading-indicator visible">
      <div class="gg-spinner"></div>
    </div>
  `;

  appEl.insertAdjacentHTML('beforeend', loadingIndicatorEl);
}

function hideLoadingIndicator() {
  const spinner = document.querySelector('.loading-indicator');
  if (spinner) {
    spinner.classList.remove('visible');
  }
}

export {
  mainChat,
  login,
  register,
  error,
  messages,
  users,
  showLoadingIndicator,
  hideLoadingIndicator,
};