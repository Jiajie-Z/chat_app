import { fetchLogin, fetchLogout, fetchSession, fetchStoredWord, updateStoredWord } from './services';
import { render } from './render';
import { isValidWord, isValidUsername } from '../users';

const state = {
    isLoggedIn: false,
    username: '',
    storedWord: '',
    errorMessage: '',
};

export function setupEventListeners() {
    const appDiv = document.getElementById('app');

    appDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('logout')) {
            logout();
        }
    });

    appDiv.addEventListener('submit', (e) => {
        e.preventDefault();

        if (e.target.classList.contains('login__form')) {
            const username = e.target.querySelector('.input__box').value.trim();
            if (!isValidUsername(username)) {
                state.errorMessage = 'Username can only contain letters, numbers, and underscores.';
                render(state);
                return;
            }
            login(username);
        }

        if (e.target.classList.contains('word__form')) {
            const newWord = e.target.querySelector('.input__box').value.trim();

            checkSession()
                .then(() => {
                    updateUserWord(newWord);
                })
                .catch(() => {
                    state.isLoggedIn = false;
                    render(state);
                });
        }
    });
}

function login(username) {
    return fetchLogin(username)
        .then(data => {
            state.isLoggedIn = true;
            state.username = data.username;
            state.errorMessage = '';
            return fetchStoredWord();
        })
        .then(data => {
            state.storedWord = data.storedWord;
            render(state);
        })
        .catch(error => {
            if (error.error === 'auth-insufficient') {
                state.errorMessage = 'Dogs are not welcome here';
            } else if (error.error === 'required-username') {
                state.errorMessage = 'Username cannot contain special characters.';
            } else {
                state.errorMessage = 'Login failed. Please try again.';
            }
            render(state);
            return Promise.reject(errorMessage);
        });
}

function logout() {
    return fetchLogout()
        .then(() => {
            state.isLoggedIn = false;
            state.username = '';
            state.storedWord = '';
            state.errorMessage = '';
            render(state);
        })
        .catch(() => {
            render(state);
            return Promise.reject('Logout failed');
        });
}


export function checkSession() {
    return fetchSession() 
        .then(data => {
            state.isLoggedIn = true;
            state.username = data.username;
            return fetchStoredWord();
        })
        .then(data => {
            state.storedWord = data.storedWord;
            render(state);
        })
        .catch(() => {
            state.isLoggedIn = false;
            render(state);
            return Promise.reject(); 
        });
}


function updateUserWord(newWord) {
    if (!isValidWord(newWord)) {
        state.errorMessage = 'Only letters are allowed.';
        render(state);
        return;
    }

    updateStoredWord(newWord)
        .then(data => {
            state.storedWord = data.storedWord;
            state.errorMessage = '';
            render(state);
        })
        .catch(error => {
            if (error.error === 'auth-missing') {
                state.isLoggedIn = false;
                state.errorMessage = '';

            } else if (error.error === 'invalid-word') {
                state.errorMessage = 'Only letters are allowed.';
            } else if (error.error === "required-word"){
                state.errorMessage = 'input can not be empty.'
            }
             else {
                state.errorMessage = 'Failed to update word. Please try again.';
            }
            render(state);
        });
}


