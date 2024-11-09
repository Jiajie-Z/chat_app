"use strict";

const users = {};

const messages = [];

function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && username.trim().length <= 20;
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

function addMessage({ sender, text }) {
    messages.push({sender, text});
}

function addUser(username) {
    if (isValidUsername(username)) {
        users[username] = username;
    }
}

function deleteUser(username) {
    delete users[username];
}

module.exports = {
    users,
    messages,
    isValidUsername,
    addUser,
    deleteUser,
    addMessage,
};