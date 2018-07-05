'use strict';

// Save data to local storage
export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Load data from local storage
export function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Delete from local storage
export function removeFromStorage(key) {
  localStorage.removeItem(key);
}

export function getCurrencyIcon(currencyCode) {
  switch (currencyCode) {
    case 'EUR':
      return '€';
    case 'ILS':
      return '₪';
    case 'USD':
      return '$';
  }
}

export function makeid(length = 5) {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

export default {
  loadFromStorage,
  saveToStorage,
  removeFromStorage,
  getCurrencyIcon,
  makeid
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} arr items An array containing the items.
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
