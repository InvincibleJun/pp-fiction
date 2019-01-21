const util = require('../../utils/util.js');
const { openArticle } = require('../../services/fiction');

Page({
  data: {
    _id: '',
    index: 0,
    title: '',
    article: '',
    next: null,
    prev: null
  },

  onLoad: function({ index, _id }) {
    this.setData({ _id });
    openArticle({ index }, { _id }).then(
      ({ next, prev, article, title, index }) => {
        this.setData({
          index: +index,
          title,
          next,
          prev,
          article
        });
      }
    );
  },

  prevArticle: function() {
    wx.navigateTo({
      url: `../article/article?index=${--this.data.index}&_id=${this.data._id}`
    });
  },

  nextArticle: function() {
    wx.navigateTo({
      url: `../article/article?index=${++this.data.index}&_id=${this.data._id}`
    });
  },

  openActicle: function(event) {
    const { index } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `../article/article?url=${index}`
    });
  }
});
