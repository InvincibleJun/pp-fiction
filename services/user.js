const request = require('../utils/request.js');

const addUser = data => request('/api/user', { data, method: 'POST' });

const getUserBooks = query => request('/api/user/book', { query });

const addBook = data => request('/api/user', { data, method: 'PUT' });

const openArticle = (params, query) =>
  request('/api/article/:index', { params, query });

module.exports = {
  addUser,
  getUserBooks,
  addBook
};
