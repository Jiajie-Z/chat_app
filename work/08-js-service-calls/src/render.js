export function render(state) {
    const appDiv = document.getElementById('app');

    if (state.isLoggedIn) {
        appDiv.innerHTML = `
            <div>
                <h2 class="header">Welcome, ${state.username}</h2>
                <p>Your stored word: ${state.storedWord}</p>
                <form class="word__form">
                    <input class="input__box" type="text" placeholder="Enter a new word" />
                    <button class="button" type="submit">Update Word</button>
                </form>
                <button class="logout button">Logout</button>
                ${state.errorMessage ? `<p class="error-message">${state.errorMessage}</p>` : ''}
            </div>
        `;
    } else {
        appDiv.innerHTML = `
            <div>
                <h2 class="header">Login</h2>
                <form class="login__form">
                    <input class="input__box" type="text" placeholder="Username" />
                    <button class="button" type="submit">Login</button>
                </form>    
                ${state.errorMessage ? `<p class="error-message">${state.errorMessage}</p>` : ''}
            </div>
        `;
    }
}
