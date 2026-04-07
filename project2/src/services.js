import * as views from "./views";

export function fetchRegister(username, password) {
  return fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchLogin(username, password) {
  return fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}
  
  
  
  export function fetchLogout() {
    return fetch('/api/session', {
      method: 'DELETE',
    })
      .catch(() => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
          return Promise.reject({ error: 'logout-failed' });
        }
        return response.json();
      });
  }
  
  export function fetchSession() {
    return fetch('/api/session')
      .catch(() => Promise.reject({ error: 'network-error' }))
      .then(response => {
        if (!response.ok) {
          return Promise.reject({ error: 'auth-missing' });
        }
        return response.json();
      });
  }


export function fetchUsers() {
    return fetch('/api/users')
        .catch( err => Promise.reject({ error: 'network-error' }) )
        .then( response => {
            if(!response.ok) {
                return response.json().then( err => Promise.reject(err) );
            }
            return response.json();
        })
}



export function fetchMessages() {
    views.showLoadingIndicator();
    return fetch('/api/messages',)
        .catch( err => Promise.reject({ error: 'network-error' }) )
        .then( response => {
            if(!response.ok) {
                return response.json().then( err => Promise.reject(err) );
            }
            views.hideLoadingIndicator();
            return response.json();

        })
}



export function fetchOutgoingMessage(message){
    return fetch('/api/messages', {
        method: 'POST',
        headers: {
            'content-type': 'application/json', 
        },
        body: JSON.stringify({message}),
    })
        .catch(err => Promise.reject({ error: 'network-error' }))
        .then(response => {
            if(!response.ok) {  
                return response.json().then( err => Promise.reject(err) );
            }
            return response.json(); 
        });
}





