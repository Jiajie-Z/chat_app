// This object has methods that produce HTML
// - These methods are passed data used to produce the HTML
// - In this case, they are passed the model

const chatWeb = {
  // chatPage() returns the HTML for the page
  // it calls the other methods to generate the HTML for different sections
  chatPage: function (chat) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="/styles.css">
        </head>
        <body>
          <div id="chat-app">
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
            ${chatWeb.getOutgoingSection(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function (chat) {
    return `<ol class="messages">` +
      Object.values(chat.messages).map(message => `
        <li class="message">
          <div class="message-content">
            <span class="message-text">
              <p>${message.sender}: ${message.text}</p>
            </span>
          </div>
        </li>
        `).join('') +
      `</ol>`;
  },



  getUserList: function (chat) {
    // This is a bit of a complex structure
    // Lookup Object.values() in MDN
    // .map() generates a new array based on calling the callback
    // on each element of the array
    // So this .map() converts the user names to an array of HTML
    // and .join() converts the array of HTML into a single HTML string
    return `<ul class="users">` +
      Object.values(chat.users).map(user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
      `</ul>`;
  },
  getOutgoingSection: function () {
    
    return `
    <form class="form" action="/chat" method="POST">
      <input class="chatbox" type="text" name="text" placeholder="Type your message..." required/>
      <input class="user" type="hidden" name="username" value="Bond"/>
      <button class="submit__button" type="submit">Send</button>
    </form>
    `
  }
};
module.exports = chatWeb;
