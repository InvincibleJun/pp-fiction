var extendObservable = require('../libs/mobx').extendObservable

var data = function () {
  extendObservable(this, {
    userInfo: null,
    books: []
  })
  this.init = function (userInfo){
    this.userInfo = userInfo;
  }

  this.setBooks = function(books) {
    this.books = books;
  }
}

module.exports = {
  default: new data
}