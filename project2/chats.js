const db = require('./db');

function isValidUsername(username) {
  if (!username || typeof username !== 'string') {
    return false;
  }

  let isValid = true;
  isValid = isValid && username.trim().length > 0;
  isValid = isValid && username.trim().length <= 20;
  isValid = isValid && /^[A-Za-z0-9_]+$/.test(username);
  return isValid;
}

async function ensureUser(username) {
  await db.execute(
    'INSERT IGNORE INTO users (username) VALUES (?)',
    [username]
  );
}

async function addMessage({ sender, text }) {
  await db.execute(
    'INSERT INTO messages (sender, text) VALUES (?, ?)',
    [sender, text]
  );
}

async function getMessages() {
  const [rows] = await db.execute(
    'SELECT sender, text, created_at FROM messages ORDER BY id ASC'
  );

  return rows;
}

module.exports = {
  isValidUsername,
  ensureUser,
  addMessage,
  getMessages,
};