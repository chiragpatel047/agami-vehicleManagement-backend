const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./storage');

module.exports = localStorage;
