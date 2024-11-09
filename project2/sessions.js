const sessions = {};

function generateSessionId(username) {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000); // Adds a small random element
  return `session-${timestamp}-${randomNum}-${username}`;
}

function addSession(username) {
    const sid = generateSessionId();
    sessions[sid] = {
        username,
    };
    return sid;
}

function getSessionUser(sid) {
    return sessions[sid]?.username;
}

function deleteSession(sid) {
    delete sessions[sid];
}


module.exports = {
    addSession,
    deleteSession,
    getSessionUser
};