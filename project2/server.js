const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const chats = require('./chats');


app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json()); 



app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }
    res.json({ username });
});


app.post('/api/session', (req, res) => {
    const { username } = req.body;

    if(!chats.isValidUsername(username)) {
        res.status(400).json({ error: 'required-username' });
        return;
    }

    if(username === 'dog') {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);
    chats.addUser(username);

    res.cookie('sid', sid);

    res.json({ username });
});


app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(sid) {
        res.clearCookie('sid');
    }

    if(username) {
       
        sessions.deleteSession(sid);

    }

    res.json({ wasLoggedIn: !!username }); 
});


app.get('/api/messages', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const messagesList = chats.messages;

    res.json({ username, messagesList });
});



app.post('/api/messages', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { message } = req.body;

    if(!message) {
        res.status(400).json({ error: 'required-message' });
        return;
    }

    chats.addMessage({ sender:username, text:message });

    res.json({ username, sentMessage: message });
});

app.get('/api/users', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if(!sid || !username) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const usersList = chats.users;

    res.json({ username, usersList });
})


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));