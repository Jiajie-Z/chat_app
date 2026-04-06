const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const sessions = require('./sessions');
const chats = require('./chats');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

app.get('/api/session', async (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? await sessions.getSessionUser(sid) : '';

  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json({ username });
});

app.post('/api/session', async (req, res) => {
  const { username } = req.body;

  if (!chats.isValidUsername(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if (username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  try {
    await chats.ensureUser(username);
    const sid = await sessions.addSession(username);

    res.cookie('sid', sid);
    res.json({ username });
  } catch (err) {
    res.status(500).json({ error: 'server-error' });
  }
});

app.delete('/api/session', async (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? await sessions.getSessionUser(sid) : '';

  if (sid) {
    res.clearCookie('sid');
  }

  if (username) {
    await sessions.deleteSession(sid);
  }

  res.json({ wasLoggedIn: !!username });
});

app.get('/api/messages', async (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? await sessions.getSessionUser(sid) : '';

  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  try {
    const messagesList = await chats.getMessages();
    res.json({ username, messagesList });
  } catch (err) {
    res.status(500).json({ error: 'server-error' });
  }
});

app.post('/api/messages', async (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? await sessions.getSessionUser(sid) : '';

  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { message } = req.body;

  if (!message || !message.trim()) {
    res.status(400).json({ error: 'required-message' });
    return;
  }

  try {
    await chats.addMessage({
      sender: username,
      text: message.trim(),
    });

    res.json({ username, sentMessage: message.trim() });
  } catch (err) {
    res.status(500).json({ error: 'server-error' });
  }
});

app.get('/api/users', async (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? await sessions.getSessionUser(sid) : '';

  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  try {
    const usersList = await sessions.getLoggedInUsers();
    res.json({ username, usersList });
  } catch (err) {
    res.status(500).json({ error: 'server-error' });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});