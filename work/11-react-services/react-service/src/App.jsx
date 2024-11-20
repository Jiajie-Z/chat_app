import { useState, useEffect } from 'react';

import './App.css';

import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchStoredWord,
  fetchUpdateStoredWord,
} from './services';

import LoginForm from './LoginForm';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import AddWordForm from './AddWordForm';
import Word from './Words';


function App() {

  // Here we define our "top level" state
  // These values are passed down to other components
  // We COULD have fewer states if we used objects to track multiple state values
  // But here I've done them as individual values to keep it basic
  //
  const [ error, setError ] = useState('');
  const [ username, setUsername] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING); // one variable covers multiple cases
  const [ isWordPending, setIsWordPending ] = useState(false);
  const [word, setWord] = useState('');

  // We also pass "action" functions that do things and update state
  // The top level state has a BUNCH of these
  // We can move these elsewhere - we'll look at that later
  // For now, recognize the benefit of keeping the JSX returned at the bottom of this component
  // clean and readable because we have all of these state-management functions here

  function onLogin( username ) {
    setIsWordPending(true);

    fetchLogin(username)
    .then( response => {
      setError(''); // in case another action had set an error
      setUsername(response.username);
      
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);

      setTimeout(() => { 
        setIsWordPending(false); // Disable loading indicator
        setWord( response.storedWord);
    }, 2000);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setWord('');
    
    fetchLogout() // We don't really care about results
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

 

  function onUpdateWord( word ) {

    setError('');
    setIsWordPending(true); 
    checkForSession(); // Refresh the session to ensure we have the latest word

    fetchUpdateStoredWord( word )
    .then( response => {

        setTimeout(() => { // Setup 2 seconds delay to mock loading resources
            setIsWordPending(false); //Hides loading indicator
            setWord( response.storedWord);
        }, 2000);

    })
    .catch( err => {
        setIsWordPending(false); //Hides loading indicator
        setError( err?.error || 'ERROR');
    })

}


  

  function checkForSession() {
    fetchSession()
    .then( session => { // The returned object from the service call
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); // We do not have todos yet!
      return fetchStoredWord();
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
      }
      return Promise.reject(err); // Pass any other error unchanged
    })
    .then( session => {
      setWord(session.storedWord);
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { // expected "error"
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        // Not yet logged in isn't a reported error
        return;
      }
      // For unexpected errors, report them
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });

  }

  // Here we use a useEffect to perform the initial loading
  // Initial loading isn't triggered by an event like most service calls
  useEffect(
    () => {
      checkForSession();
    },
    [] // Only run on initial render
  );

  return (
    <div className="app">
      <main className="main">
        { error && <Status error={error}/> }
        { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
        { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <>
          {isWordPending ?
            <Loading/>:
          
          <div className="content">
            <p>Hello, {username}</p>
            <Controls onLogout={onLogout}/>
            <Word storedWord={word}/>
            <AddWordForm onUpdateWord={onUpdateWord}/>
          </div>
          }
          </>
        )}

      </main>
    </div>
  );
}

export default App;
