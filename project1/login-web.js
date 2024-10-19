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
      <h1>Login</h1>
      ${message ? `<p class="error">${message}</p>` : ''}
      <form action="/login" method="POST">
        <label for="username">Username:</label>
        <input class="input__box" type="text" id="username" name="username" required>
        <button class="button" type="submit">Login</button>
      </form>
    </body>
    </html>
  `;
}

module.exports = { generateLoginPage };



