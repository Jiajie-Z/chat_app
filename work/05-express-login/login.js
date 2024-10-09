const crypto = require('crypto');

const sessions = {};
const userData = {};

function generateSessionId() {
  return crypto.randomUUID();
}

function validateUsername(username) {
  return /^[a-zA-Z0-9]+$/.test(username);
}

module.exports = { sessions, userData, generateSessionId, validateUsername };
