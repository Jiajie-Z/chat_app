import { fetchLogin, fetchLogout, fetchSession, fetchUsers, fetchMessages,fetchOutgoingMessage } from './services';
import * as views from "./views";


const state = {
    isLoggedIn: true,
    username: '',
    messagesList: '',
    usersList : '', 
    errorMessage: ''
};

function resetstate() {
    state.isLoggedIn = true;
    state.username = '';
    state.messagesList = '';
    state.usersList = '';
    state.errorMessage = '';
}

function render() {
    if (state.errorMessage) {
        views.error(state.errorMessage);
        state.errorMessage = '';
        return;
    }

    if (!state.username) {
        views.login();
        return;
    }

    if (state.isLoggedIn) {
        
        setTimeout(() =>{
        views.mainChat(state.username, state.usersList, state.messagesList);
        }, 1500);
    }

}

function begin() {

    fetchSession()
        .then( response => {
            if(response.username) {
                
                state.username = response.username;
                state.errorMessage = '';
                return Promise.all([refreshMessages(), refreshUsers()]);
            }
        })
        .catch(err => {
            if (err && err.error === 'auth-missing') {
                resetstate();
            
            } else if (err.error === 'required-message') {
                state.errorMessage = 'input could not be empty';
            } else if (err.error === "required-username"){
                state.errorMessage = 'Username cannot contain special characters.'
            }
             else {
                state.errorMessage = 'Failed to login. Please try again.';
            }
        })
        
                render();
            
}

begin();


function refreshMessages() {
    return new Promise((resolve, reject) => {
        fetchMessages()
            .then( response => {
                if (!state.messagesList || state.messagesList.length < response.messagesList.length) {
                    state.messagesList = response.messagesList;
                    resolve('update');
                }
                resolve();
            })
            .catch( err => {
                if (err && err.error === 'auth-missing') {
                    resetstate();
                } else if (err.error === 'required-message') {
                    state.errorMessage = 'input could not be empty';
                } else if (err.error === "required-username"){
                    state.errorMessage = 'Username cannot contain special characters.'
                }
                 else {
                    state.errorMessage = 'Failed to login. Please try again.';
                }
                reject(err);
            });
    });
}

function refreshUsers() {
   return new Promise((resolve,reject) => {
        fetchUsers()
            .then ( response => {
                if (!state.usersList || JSON.stringify(state.usersList) !== JSON.stringify(response.usersList) ) {
                    state.usersList = response.usersList;
                    resolve('update');
                }
                resolve();
            })
            .catch( err => {
                if (err && err.error === 'auth-missing') {
                    resetstate();
                } else if (err.error === 'required-message') {
                    state.errorMessage = 'input could not be empty';
                } else if (err.error === "required-username"){
                    state.errorMessage = 'Username cannot contain special characters.'
                }
                 else {
                    state.errorMessage = 'Failed to login. Please try again.';
                }
                reject(err);
            });
    });
}

function renderMessages() {
    refreshMessages()
        .then( response => {
            if (response === 'update') {
                views.messages(state.messagesList);
            }
        })
        .catch( err => { 
            if (err && err.error === 'auth-missing') {
                resetstate();
            } else if (err.error === 'required-message') {
                state.errorMessage = 'input could not be empty';
            } else if (err.error === "required-username"){
                state.errorMessage = 'Username cannot contain special characters.'
            }
             else {
                state.errorMessage = 'Failed to login. Please try again.';
            }
            render();
        });
}

function reRender() {
    if (state.username) {
        renderMessages();
        renderUsers();
    }
    setTimeout(reRender, 5000); 
}

reRender();

function renderUsers() {
    refreshUsers()
        .then( response => {
            if (response === 'update') {
                views.users(state.usersList);
            }
        })
        .catch( err => {
            if (err && err.error === 'auth-missing') {
                resetstate();
            } else if (err.error === 'required-message') {
                state.errorMessage = 'input could not be empty';
            } else if (err.error === "required-username"){
                state.errorMessage = 'Username cannot contain special characters.'
            }
             else {
                state.errorMessage = 'Failed to login. Please try again.';
            }
            render();
        });
}


const appEl = document.querySelector('#chat-app');
appEl.addEventListener('click', (e) => {
    if (e.target.classList.contains('login__button') ){

        e.preventDefault(); 

        const username = document.querySelector('#username').value;
        fetchLogin(username)
            .then( response => {

                state.username = response.username;
                return Promise.all([refreshMessages(), refreshUsers()]);

            })
            .then(() => {
                render(); 
            })
            .catch(err => {

                if (err && err.error === 'auth-missing') {
                    resetstate();
                } else if (err.error === 'required-message') {
                    state.errorMessage = 'input could not be empty';
                } else if (err.error === "required-username"){
                    state.errorMessage = 'Username cannot contain special characters.'
                }
                 else {
                    state.errorMessage = 'Failed to login. Please try again.';
                }

            })
            
                render();
            
        return;
    }

    if (e.target.classList.contains('send__button')) {

        e.preventDefault(); 

        const messageInputEl = document.querySelector('.outgoing');
        const newMessage = messageInputEl.value;

        if (newMessage) { 
            fetchOutgoingMessage(newMessage)
                .then( response => {

                    if (response.username !== state.username) {
                        resetstate();
                        return;
                    }

                    return Promise.all([refreshMessages(), refreshUsers()]);

                })
                .then(() => {
                    render(); 
                })
                .catch(err => {

                    if (err && err.error === 'auth-missing') {
                        resetstate();
                    } else if (err.error === 'required-message') {
                        state.errorMessage = 'input could not be empty';
                    } else if (err.error === "required-username"){
                        state.errorMessage = 'Username cannot contain special characters.'
                    }
                     else {
                        state.errorMessage = 'Failed to login. Please try again.';
                    }

                })
                
                render();
                
        }
        return;
    }

    if (e.target.classList.contains('logout__button') ) {
        fetchLogout()
            .then( response => {
                resetstate();
            })
            .then(() => {
                render(); 
            })
            .catch( err => {

                if (err && err.error !== 'auth-missing') {
                    if (err.error === 'required-message') {
                        state.errorMessage = 'input could not be empty';
                    } else if (err.error === "required-username"){
                        state.errorMessage = 'Username cannot contain special characters.'
                    }
                     else {
                        state.errorMessage = 'Failed to login. Please try again.';
                    }
                }

            })
            
            render();
            
    }
});