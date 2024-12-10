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
  fetchTodos,
  fetchUpdateTodo,
  fetchDeleteTodo,
  fetchAddTodo,
} from './services';

import LoginForm from './LoginForm';
import Todos from './Todos';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import AddTodoForm from './AddTodoForm';

function App() {

  const [ error, setError ] = useState('');
  const [ username, setUsername] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING); // one variable covers multiple cases
  const [ isTodoPending, setIsTodoPending ] = useState(false);
  const [ todos, setTodos ] = useState({});
  const [ lastAddedTodoId, setLastAddedTodoId ] = useState();   


  function onLogin( username ) {
    setIsTodoPending(true);
    fetchLogin(username)
    .then( fetchedTodos => {
      setError(''); 
      setTodos( fetchedTodos );
      setIsTodoPending(false);
      setUsername(username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setTodos({});
    setLastAddedTodoId('');
    fetchLogout() 
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function onRefresh() {
    setError('');
    setIsTodoPending(true); 
    fetchTodos()
    .then( todos => {
      setTodos(todos);
      setLastAddedTodoId('');
      setIsTodoPending(false);
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function onDeleteTodo(id) {
    setError('');
    setIsTodoPending(true); 
    fetchDeleteTodo(id)
      .then( () => {
        return fetchTodos(); 
      })
      .then( todos => {
        setTodos(todos);
        setIsTodoPending(false);
      })
      .catch( err => {
        setError(err?.error || 'ERROR'); 
      });
  }

  function onToggleTodo(id) {
    fetchUpdateTodo(id, { done: !todos[id].done } )
    .then( todo => {
      setTodos({
        ...todos, 
        [id]: todo, 
      });
      setLastAddedTodoId('');
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function onAddTodo(task, dueDate,tags) {
    fetchAddTodo(task, dueDate,tags) 
      .then((todo) => {
        setTodos({
          ...todos,
          [todo.id]: todo,
        });
        setLastAddedTodoId(todo.id);
      })
      .catch((err) => setError(err?.error || 'ERROR'));
  }

  function onUpdateNote(id, note) {
    fetchUpdateTodo(id, { note }) 
        .then((updatedTodo) => {
            setTodos({
                ...todos,
                [id]: updatedTodo,
            });
        })
        .catch((err) => {
            setError(err?.error || 'ERROR');
        });
}

  

  function checkForSession() {
    fetchSession()
    .then( session => { 
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); 
      return fetchTodos(); 
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) 
      }
      return Promise.reject(err); 
    })
    .then( todos => {
      setTodos(todos);
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { 
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        return;
      }
      setError(err?.error || 'ERROR'); 
    });

  }

  useEffect(
    () => {
      checkForSession();
    },
    [] 
  );

  return (
    <div className="app">
      <main className="main">
        { error && <Status error={error}/> }
        { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
        { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <p>Hello, {username}</p>
            <Controls onLogout={onLogout} onRefresh={onRefresh}/>
            <Todos
              isTodoPending={isTodoPending}
              todos={todos}
              lastAddedTodoId={lastAddedTodoId}
              onDeleteTodo={onDeleteTodo}
              onToggleTodo={onToggleTodo}
              onUpdateNote={onUpdateNote}
            />
            <AddTodoForm onAddTodo={onAddTodo}/>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
