const express = require('express');
const cookieParser = require('cookie-parser');
const loginController = require('./login');
const gameController = require('./game');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(cookieParser());


app.get('/', loginController.checkSession, gameController.homePage);
app.post('/login', loginController.login);
app.post('/guess', gameController.makeGuess);  
app.post('/new-game', gameController.newGame);  
app.post('/logout', loginController.logout);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
