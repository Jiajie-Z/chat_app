
function generateLoginPage(message = '') {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Login</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1 class="header">Login</h1>
        ${message ? `<p>${message}</p>` : ''}
        <form class="form" action="/login" method="POST">
          <label for="username">Username:</label>
          <input class="input__box" type="text" id="username" name="username">
          <button class="button" type="submit">Login</button>
        </form>
      </body>
      </html>
    `;
  }
  


function generateDataPage(username, storedWord) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Data Page</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <h1>Welcome, ${username}</h1>
      <p>Your stored word: ${storedWord || ''}</p>
      <form class="form" action="/change-word" method="POST">
        <label for="newWord">Change stored word:</label>
        <input class="input__box" type="text" id="newWord" name="newWord" value="${storedWord || ''}">
        <button class="button" type="submit">Change</button>
      </form>
      <form  class="form" action="/logout" method="POST">
        <button class="button" type="submit">Logout</button>
      </form>
    </body>
    </html>
  `;
}

  
  module.exports = { generateLoginPage, generateDataPage };
  