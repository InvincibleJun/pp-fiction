//index.js
//获取应用实例
import { observer } from '../../libs/observer';
import { searchFiction } from '../../services/fiction';
import { getUserBooks } from '../../services/user';

const app = getApp();

Page(
  observer({
    props: require('../../store/index.js').default,

    data: {
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
      //     if (app.globalData.userInfo) {
      // this.init();
      // } else {
      // app.globalData.init = () => {
      // this.init();
      // };
      // }
    },
    init: function(e) {
      // this.setData({
      //   userInfo: app.globalData.userInfo,
      //   hasUserInfo: true,
      // });
    },

    searchBooks: function({ detail }) {
      searchFiction({ key: detail.value }).then(res => {
        this.setData({ result: res });
      });
    },

    readBook: function(event) {
      const { index, id, title } = event.currentTarget.dataset;
      wx.navigateTo({
        url: `../article/article?index=${index === -1 ? 0 : index}&_id=${id}`
      });
    },

    openBook: function(event) {
      const { id, title } = event.currentTarget.dataset;

      wx.navigateTo({
        url: `../book/book?id=${id}&title=${title}`
      });
    }
  })
);
