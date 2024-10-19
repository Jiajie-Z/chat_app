const crypto = require('crypto');
const { generateLoginPage } = require('./login-web');
const words = require('./words');

const sessions = {};
const userData = {};

function generateSessionId() {
  return crypto.randomUUID();
}

function validateUsername(username) {
  return /^[a-zA-Z0-9]+$/.test(username);
}

function login(req, res) {
  const username = req.body.username.trim();

  if (!username || !validateUsername(username)) {
    return res.status(400).send(generateLoginPage('Invalid username. Please try again.'));
  }

  if (username === 'dog') {
    return res.status(403).send(generateLoginPage('Username "dog" is not allowed.'));
  }

  const sid = generateSessionId();
  sessions[sid] = { username };

  if (!userData[username]) {
    const secretWord = words[Math.floor(Math.random() * words.length)];
    userData[username] = {
      secretWord,
      guesses: [],
      possibleWords: words.slice(),
      isWon: false,
    };
    console.log(`New game started for ${username} with secret word: ${secretWord}`);
  }

  res.cookie('sid', sid, { httpOnly: true, secure: false });
  res.redirect('/');
}

function checkSession(req, res, next) {
  const sid = req.cookies.sid;
  const session = sessions[sid];

  if (!session) {
    return res.send(generateLoginPage());
  }

  next();
}

function logout(req, res) {
  const sid = req.cookies.sid;

  delete sessions[sid];
  res.clearCookie('sid');
  res.redirect('/');
}

module.exports = { login, checkSession, logout, sessions, userData };
