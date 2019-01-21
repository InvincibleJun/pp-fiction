//index.js
//获取应用实例
const app = getApp();

const { searchFiction } = require('../../services/fiction');
const { getUser } = require('../../services/user');

Page({
  data: {
    books: [],
    result: [],
    userInfo: {},
    hasUserInfo: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.init();
    } else {
      app.globalData.init = () => {
        this.init();
      };
    }
  },
  init: function(e) {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: true
    });
    getUser(app.globalData.userInfo).then(res => {
      this.setData({
        books: res.books
      });
    });
  },
  searchBooks: function({ detail }) {
    searchFiction({ key: detail.value }).then(res => {
      this.setData({ result: res });
    });
  },
  openBook: function(event) {
    const { id, title } = event.currentTarget.dataset;

    wx.navigateTo({
      url: `../book/book?id=${id}&title=${title}`
    });
  }
});
