function mainChat(username, usersList, messagesList) {
    const appEl = document.querySelector('#chat-app');

    appEl.innerHTML = `
        <div id="chat">
            <div id="welcome">
                <p>Hello, ${username}!</p>
                <div id="logout">
                    <button class="logout__button" type="submit">Logout</button>
                </div>
            </div>
            <div id="main">
                <div id="users">
                    ${getUserList(usersList)}
                </div>
                <div id="messages">
                    ${getMessageList(messagesList)}
                </div>
                <div id="outgoing">
                    ${getOutgoingSection()}  
                </div>
            </div>
        </div>
    `;
}

function login() {
    const appEl = document.querySelector('#chat-app');
    appEl.innerHTML = `
        <div id="login">
            <h1>Chatting Room</h1>
            <form class="login">
                <input id="username" type="text" placeholder="Enter your username">
                <button class="login__button" type="submit">Login</button>
            </form>
        </div>
    `;
}

function getUserList(usersList) {
    return `<ul class="users">` +
            Object.values(usersList).map( user => `
            <li>
               <div class="user">
                 <span class="username">${user}</span>
               </div>
            </li>
          `).join('') +
           `</ul>`;
}

function getMessageList(messagesList) {
    return `<ol class="messages">` +
            Object.values(messagesList).map( message => `
            <li>
                <div class="message">
                  <span class="username">${message.sender}:${message.text}</span>
                </div>
            </li>
        `).join('')+
            `</ol>`;
}

function getOutgoingSection() {
    return `
        <div>
            <form>
                <input class="outgoing" name="text" placeholder="Type your message..."/></input>
                <button class="send__button" type="submit">Send</button>
            </form>
        </div>
    `;
}


function messages(messagesList) {
    const messagesEl = document.querySelector('#messages');
    messagesEl.innerHTML = getMessageList(messagesList);
}

function users(usersList) {
    const usersEl = document.querySelector('#users');
    usersEl.innerHTML = getUserList(usersList);
}

function error(errorMessage) {
    const appEl = document.querySelector('#chat-app');
    appEl.innerHTML = `
        <div class="error__message>
            <p id="error-message">${errorMessage}</p>
            <a href="/">home page</a>
        </div>
    `;
}

function showLoadingIndicator() {
    const appEl = document.querySelector('#chat-app');
    const loadingIndicatorEl = `
        <div class="loading-indicator">
            <div class="gg-spinner"></div>
        </div>
    `;
    appEl.insertAdjacentHTML('beforeend', loadingIndicatorEl);
    document.querySelector('.loading-indicator').classList.add('visible');
}

function hideLoadingIndicator() {
    const spinner = document.querySelector('.loading-indicator');
    if (spinner) {
        spinner.classList.remove('visible');
    }
}

export  {
    mainChat,
    login,
    error,
    messages,
    users,
    showLoadingIndicator,
    hideLoadingIndicator
    
};
