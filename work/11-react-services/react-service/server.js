import express from 'express';
import cookieParser from 'cookie-parser';
import sessions from './sessions.js';
import users from './users.js';

const app = express();
// PORT=4000 node server.js (Windows version:  SET PORT=4000 && node server.js)
// lets us run on a different port from the dev server from `npm start`
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValidUsernmame(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  // Notice here that an existing session will just get back the username
  // So the consumer will need to make an additional service call to get the list of todos
  // But below performing a login (creating a session) will return the list of todos directly
  // I have this difference because these are the sorts of quirks you can expect when you
  // consume services, not because I advocate for this inconsistency
  //
  // Which way is best depends on your service
  // - forcing extra service calls is bad
  // - sending more data than needed is bad
  // Your service specifics decides which is "worse"
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if(!users.isValidUsernmame(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);

  res.cookie('sid', sid);

  users.wordFor[username] ||= "";

  res.json({ username});
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }

  // We don't report any error if sid or session didn't exist
  // Because that means we already have what we want
  res.json({ username });
});

//Words
app.get('/api/word', (req, res) => {
  // Session checks for these are very repetitive - a good place to abstract out
  // I've left the repetitive sections here for ease of learning
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const storedWord = users.wordFor[username] || "";

  res.json({ username, storedWord });
});

app.put('/api/word', (req, res) => {
  // Session checks for these are very repetitive - a good place to abstract out
  // I've left the repetitive sections here for ease of learning
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { word } = req.body;

  if(!word && word !== '') {
    res.status(400).json({ error: 'required-word' });
    return;
  }

  if(!users.isValidWord(word)) {
    res.status(400).json({ error: 'invalid-word' });
    return;
  }

  users.wordFor[username] = word;

  res.json({ username, storedWord: word });
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

