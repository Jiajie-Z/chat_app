const express = require('express');
const cookieParser = require('cookie-parser');
const { generateLoginPage, generateDataPage } = require('./login-web');
const { sessions, userData, generateSessionId, validateUsername } = require('./login');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(cookieParser());



app.get('/', (req, res) => {
  const sid = req.cookies.sid;
  const session = sessions[sid];

  if (!session) {
    return res.send(generateLoginPage());
  }

  const username = session.username;
  const storedWord = userData[username] || '';
  res.send(generateDataPage(username, storedWord));
});



app.post('/login', (req, res) => {
  const username = req.body.username.trim();

  if (!username || !validateUsername(username)) {
    return res.status(400).send(generateLoginPage('Invalid username. <a href="/">Try again</a>'));
  }
                                   
  if (username === 'dog') {
    return res.status(403).send(generateLoginPage('Username "dog" is not allowed. <a href="/">Try again</a>'));
  }

  const sid = generateSessionId();
  sessions[sid] = { username };
  res.cookie('sid', sid);
  res.redirect('/');
});



app.post('/change-word', (req, res) => {
    const sid = req.cookies.sid;
    const session = sessions[sid];
  
    if (!session) {
      return res.status(403).send('You must be logged in to change your word.');
    }
  
    const username = session.username;
    const newWord = req.body.newWord || '';
    
    userData[username] = newWord;
  
    res.redirect('/');
  });
  

app.post('/logout', (req, res) => {
  const sid = req.cookies.sid;
  delete sessions[sid];
  res.clearCookie('sid');
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
