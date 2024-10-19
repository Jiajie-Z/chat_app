const { generateGamePage } = require('./game-web');
const { generateLoginPage } = require('./login-web');
const loginController = require('./login');
const words = require('./words');



function homePage(req, res) {
  const sid = req.cookies.sid;

  if (!sid || !loginController.sessions[sid]) {
    return res.send(generateLoginPage());
  }

  const session = loginController.sessions[sid];
  const username = session.username;
  const gameData = loginController.userData[username]; 

  if (!gameData) {
    return res.redirect('/');
  }

  console.log(`The secret word for ${username} is: ${gameData.secretWord}`);

  res.send(generateGamePage(username, gameData));
 
}

function makeGuess(req, res) {
  const sid = req.cookies.sid;

  if (!sid || !loginController.sessions[sid]) {
    return res.send(generateLoginPage('Please log in to continue.'));
  }

  const session = loginController.sessions[sid];
  const username = session.username;

  const gameData = loginController.userData[username];

  if (!gameData) {
    return res.redirect('/');
  }

  gameData.errorMessage = '';

  const guess = req.body.guess.trim().toLowerCase();

  const alreadyGuessed = gameData.guesses.some(guessedWord => guessedWord.guess === guess);
  if (alreadyGuessed) {
    gameData.errorMessage = `The word "${guess}" has already been guessed. Please try a different word.`;
    return res.status(400).send(generateGamePage(username, gameData, gameData.errorMessage));
  }

  if (!words.includes(guess)) {
    gameData.errorMessage = `The word "${guess}" is not valid. Please try again.`;
    return res.status(400).send(generateGamePage(username, gameData, gameData.errorMessage));
  }

  const secretWord = gameData.secretWord.toLowerCase();
  let matchCount = 0;

  const secretWordLetterCounts = {};
  for (let letter of secretWord) {
    secretWordLetterCounts[letter] = (secretWordLetterCounts[letter] || 0) + 1;
  }

  for (let letter of guess) {
    if (secretWordLetterCounts[letter] && secretWordLetterCounts[letter] > 0) {
      matchCount++;
      secretWordLetterCounts[letter]--; 
    }
  }

  gameData.guesses.push({ guess, matchCount });

  gameData.possibleWords = words.filter(word => !gameData.guesses.some(guessedWord => guessedWord.guess === word));

  if (guess === secretWord) {
    gameData.isWon = true;
  }

  res.redirect('/');
}




function newGame(req, res) {
  const sid = req.cookies.sid;

  if (!sid || !loginController.sessions[sid]) {
    return res.send(generateLoginPage('<p>Please log in to start a new game.</p>'));
  }

  const session = loginController.sessions[sid];
  const username = session.username;

  const secretWord = words[Math.floor(Math.random() * words.length)];
  loginController.userData[username] = {
    secretWord,
    guesses: [],
    possibleWords: words.slice(),
    isWon: false,
  };

  console.log(`New game started for ${username} with secret word: ${secretWord}`);
  res.redirect('/');
}




module.exports = { homePage, makeGuess,  newGame };
