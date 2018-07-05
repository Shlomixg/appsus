'use strict';

// Save data to local storage
export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

// Load data from local storage
export function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

// Delete from local storage
export function removeFromStorage(key) {
    localStorage.removeItem(key);
}

export function makeId(length = 5) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export default {
    loadFromStorage,
    saveToStorage,
    removeFromStorage,
    makeId
}