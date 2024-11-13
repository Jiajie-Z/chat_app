import { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (username) {
      onLogin(username); 
    }
  }

  return (
    <form className="login-form"onSubmit={handleSubmit}>
      <label>
        Please enter username:
        <input
          type="text"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <button className="button" type="submit">Login</button>
    </form>
  );
}

export default Login;
