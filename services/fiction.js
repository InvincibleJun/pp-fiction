const request = require("../utils/request.js");

const searchFiction = params => request("/api/search/:key", { params });

const openBook = (params, query) => request("/api/open/:id", { params, query });

const getBookStatus = params => request("/api/book/status/:id", { params });

const openArticle = (params, query) =>
  request("/api/article/:index", { params, query });

module.exports = {
  searchFiction,
  openBook,
  openArticle,
  getBookStatus
};
