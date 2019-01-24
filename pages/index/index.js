//index.js
//获取应用实例
import { observer } from '../../libs/observer';
import { searchFiction } from '../../services/fiction';
import { getUserBooks } from '../../services/user';
// import login from '../utils/login';

const app = getApp();

Page(
  observer({
    props: require('../../store/index.js').default,

    data: {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      loading: false,
      value: '',
      state: 'my',
      result: [],
      userInfo: {},
      hasUserInfo: false,
      visible: true
    },
    closeRight() {
      this.setData({
        visible: false
      })
    },
    onLoad() {
      const { windowHeight } = wx.getSystemInfoSync();
      let boxHeight = windowHeight - 50;
      this.setData({
        boxHeight: boxHeight
      });
    },
    onShow: function() {
      getUserBooks().then(res => {
        this.props.setBooks(res.books);
      });
    },
    init: function(e) {},

    inputChange(event) {
      this.setData({
        value: event.detail.detail.value
      });
    },
    searchBooks: function() {
      this.setData({ loading: true });
      searchFiction({ key: this.data.value }).then(res => {
        this.setData({ result: res, loading: false });
      });
    },

    readBook: function(event) {
      const { index, id, title } = event.currentTarget.dataset;

      wx.navigateTo({
        url: `../article/article?index=${index === -1 ? 0 : index}&_id=${id}`
      });
    },

    deleteBook: function(event) {
      const { id } = event.currentTarget.dataset;
      console.log(event.currentTarget.dataset);
      // deleteBookService({ id }).then(res => {});
    },
    tabChange: function(event) {
      const { key } = event.detail;
      this.setData({ state: key });
    },
    openBook: function(event) {
      const { id, title } = event.currentTarget.dataset;
      wx.navigateTo({
        url: `../book/book?id=${id}&title=${title}`
      });
    },
    getUserInfo: function(event) {
      app.login();
    }
  })
);
