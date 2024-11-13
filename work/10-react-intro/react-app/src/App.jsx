import { useState } from 'react';
import Login from './Login';
import Game from './Game';
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  function handleLogin(user) {
    setIsLoggedIn(true);
    setUsername(user);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUsername("");
  }

  return (
    <>
      {isLoggedIn ? (
        <Game username={username} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
