import { setupEventListeners, checkSession } from './controller';

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    checkSession();
});