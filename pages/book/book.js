//logs.js
const util = require('../../utils/util.js');
const { openBook } = require('../../services/fiction');

Page({
  data: {
    list: []
  },
  onLoad: function({ id }) {
    openBook({ id }).then(res => {
      this.setData({
        list: res.list
      });
    });
  },
  openActicle: function(event) {
    const { url } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `../article/article?url=${encodeURIComponent(url)}`
    });
  }
});
