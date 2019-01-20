const request = require('../utils/request.js');

const searchFiction = params => request('/api/search/:key', { params });

const openBook = params => request('/api/open/:id', { params });

const openArticle = params => request('/api/article/:url', { params });

module.exports = {
  searchFiction,
  openBook,
  openArticle
};
