const request = require('../utils/request.js');

const addUser = data => request('/api/user', { data, method: 'POST' });

const getUser = params => request('/api/user/:openid', { params });

const addBook = data => request('/api/user', { data, method: 'PUT' });

const openArticle = (params, query) =>
  request('/api/article/:index', { params, query });

module.exports = {
  addUser,
  getUser,
  addBook
};
