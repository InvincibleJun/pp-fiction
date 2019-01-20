//index.js
//获取应用实例
const app = getApp();

const { searchFiction } = require('../../services/fiction');

Page({
  data: {
    result: [],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  searchBooks: function({ detail }) {
    wx.request({
      url:
        'http://120.78.222.240:1024/api/v1/article/getList?type=draft&tag=all'
    });
    searchFiction({ key: detail.value }).then(res => {
      this.setData({ result: res });
    });
  },
  openBook: function(event) {
    const { id } = event.currentTarget.dataset;
 
    wx.navigateTo({
      url: `../book/book?id=${id}`
    });
  }
});
