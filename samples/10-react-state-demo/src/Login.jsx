// This component has it's OWN state
// Used for "temporary" value, like what we type
import { useState } from 'react';

// "loginName" here is NOT the same as "username" in App.jsx
// Even if this was a variable named "username",
// it would be a different variable and different value
// We pass this loginName to the onLogin function we are passed
function Login({ onLogin }) {
  const [loginName, setLoginName] = useState('');

  return (
    <form onSubmit={ (e) => {
      e.preventDefault(); // prevent the form from navigating browser on submit
      onLogin(loginName);
    }}>
      <label>
        <span>Username: </span>
        <input
          value={loginName}
          onInput={(e) => setLoginName(e.target.value)}
        />
      </label>
      <button>Login</button>
    </form>
  );
}

export default Login;
