const util = require("../../utils/util.js");
const { openArticle } = require("../../services/fiction");

Page({
  data: {
    _id: "",
    index: 0,
    title: "",
    article: "",
    next: null,
    prev: null,
    name: ""
  },

  onLoad: function({ index, _id }) {
    this.setData({ _id }, () => {
      this.init(index, _id);
    });
  },

  init(index) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 100
    });

    openArticle({ index }, { _id: this.data._id }).then(
      ({ next, prev, article, now, title, index }) => {
        this.setData(
          {
            name: now.name,
            index: +index,
            title,
            next,
            prev,
            article
          },
          () => {
            wx.setNavigationBarTitle({
              title
            });
          }
        );
      }
    );
  },

  toMenu: function() {
    wx.navigateTo({
      url: `../book/book?id=${this.data._id}&title=${this.data.title}`
    });
  },

  prevArticle: function() {
    this.init(--this.data.index);

    // wx.navigateTo({
    //   url: `../article/article?index=${--this.data.index}&_id=${this.data._id}`
    // });
  },

  nextArticle: function() {
    this.init(++this.data.index);
  },

  openActicle: function(event) {
    const { index } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `../article/article?url=${index}`
    });
  }
});
