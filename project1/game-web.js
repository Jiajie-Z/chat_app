function generateGamePage(username, gameData, errorMessage = '') {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Game for ${username}</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <h1>Welcome to the game, ${username}!</h1>
      
      ${errorMessage ? `<p class="error">${errorMessage}</p>` : ''}
      
      <p>Possible words you can guess:</p>
      <ul class="possible__words">${gameData.possibleWords.map(word => `<li>${word}</li>`).join('')}</ul>

      <p>Previous guesses:</p>
      <ul>${gameData.guesses.map(guess => `<li>${guess.guess} - ${guess.matchCount} letters matched</li>`).join('')}</ul>

      <div class="input__fields">
        ${gameData.isWon ? `<p>Congratulations! You've won the game!</p>` : `
          <form class="guess" action="/guess" method="POST">
           <label for="guess">Your Guess:</label>
           <input class="input__box" type="text" name="guess" id="guess" required>
           <button class="button" type="submit">Submit Guess</button>
          </form>
        `}

        <form class="new__game" action="/new-game" method="POST">
         <button class="button " type="submit">Start New Game</button>
        </form>

       <form class="logout" action="/logout" method="POST">
         <button class="button" type="submit">Logout</button>
        </form>
      </div>
    </body>
    </html>
  `;
}

module.exports = { generateGamePage };
