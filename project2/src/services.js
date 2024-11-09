import * as views from "./views";

export function fetchLogin(username) {
  views.showLoadingIndicator();  // Show loading indicator before starting the fetch request
  
  return fetch('/api/session/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
  })
  .catch(err => {
      views.hideLoadingIndicator();  // Hide loading indicator on network error
      return Promise.reject({ error: 'network-error' });
  })
  .then(response => {
      views.hideLoadingIndicator();  // Hide loading indicator when response is received
      if (!response.ok) {
          return response.json().then(err => Promise.reject(err));
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





