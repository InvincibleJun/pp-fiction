//logs.js
const util = require('../../utils/util.js');
const { openBook } = require('../../services/fiction');
const { addBook } = require('../../services/user');
const app = getApp();

Page({
  data: {
    title: '',
    sort: 1,
    loaded: false,
    book: null,
    list: [],
    showList: [],
    page: 1,
    pageSize: 20,
    pageArray: []
  },
  onLoad: function({ id, title }) {
    this.setData({ title });
    openBook({ id }, { title }).then(res => {
      const pageArray = new Array(Math.ceil(res.count / this.data.pageSize));

      this.setData({
        pageArray,
        loaded: true,
        book: res
      });
      this.setShowList();
    });
  },
  setShowList: function() {
    const { page, pageSize, book, sort } = this.data;
    const { content } = book;
    const list = sort ? content : content.reverse();

    this.setData({
      showList: list.slice((page - 1) * pageSize, page * pageSize)
    });
  },
  sort: function(event) {},
  toPage: function(event) {
    const { index } = event.currentTarget.dataset;
    this.setData({
      page: index + 1
    });
    this.setShowList();
  },
  openActicle: function(event) {
    const { index } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `../article/article?index=${index}&_id=${this.data.book._id}`
    });
  },
  addToUser: function(event) {
    addBook({
      _id: this.data.book._id,
      openid: app.globalData.userInfo.openid
    });
  }
});
