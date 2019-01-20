const util = require('../../utils/util.js');
const { openArticle } = require('../../services/fiction');

Page({
  data: {
    name: '',
    content: '',
    next: null,
    prev: null
  },

  onLoad: function({ url }) {
    openArticle({ url: decodeURIComponent(url) }).then(
      ({ next, prev, content, name }) => {
        this.setData({
          name,
          next,
          prev,
          content
        });
      }
    );
  },

  prevArticle: function() {
    wx.navigateTo({
      url: `../article/article?url=${encodeURIComponent(this.data.prev)}`
    });
  },

  nextArticle: function() {
    wx.navigateTo({
      url: `../article/article?url=${encodeURIComponent(this.data.next)}`
    });
  },

  openActicle: function(event) {
    const { url } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `../article/article?url=${encodeURIComponent(url)}`
    });
  }
});
