import { useState } from 'react';


function LoginForm({ onLogin }) {
  
  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault(); // Remember this! Can be very confusing if page reloads
    if(username) {  // Don't allow blank username to try login
      // We could enforce more requirements, but I'm keeping this simple
      onLogin(username); // "action" function we were passed in
    }
  }

  return (
      <div className="login">
        <form className="login__form" action="#/login" onSubmit={onSubmit}>
          <label>
            <span>Username:</span>
            <input className="login__username" value={username} onChange={onChange}/>
          </label>
          <button className="login__button" type="submit">Login</button>
        </form>
      </div>
  );

}

export default LoginForm;
