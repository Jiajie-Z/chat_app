const crypto = require('crypto');
const db = require('./db');

function generateSessionId(username) {
  return `session-${crypto.randomUUID()}-${username}`;
}

async function addSession(username) {
  const sid = generateSessionId(username);

  await db.execute(
    'INSERT INTO sessions (sid, username) VALUES (?, ?)',
    [sid, username]
  );

  return sid;
}

async function getSessionUser(sid) {
  const [rows] = await db.execute(
    'SELECT username FROM sessions WHERE sid = ?',
    [sid]
  );

  if (!rows.length) {
    return '';
  }

  return rows[0].username;
}

async function deleteSession(sid) {
  await db.execute(
    'DELETE FROM sessions WHERE sid = ?',
    [sid]
  );
}

async function getLoggedInUsers() {
  const [rows] = await db.execute(
    'SELECT DISTINCT username FROM sessions ORDER BY username'
  );

  const users = {};
  rows.forEach(({ username }) => {
    users[username] = username;
  });

  return users;
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  getLoggedInUsers,
};