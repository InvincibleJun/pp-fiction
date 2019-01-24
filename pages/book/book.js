import { observer } from '../../libs/observer';
import util from '../../utils/util.js';

const { openBook, getBookStatus } = require('../../services/fiction');
const { addBook } = require('../../services/user');
const app = getApp();

let timer;

Page(
  observer({
    props: require('../../store/index.js').default,

    data: {
      title: '',
      sort: 1,
      loaded: false,
      book: null,
      list: [],
      download: false,
      showList: [],
      page: 1,
      pageSize: 20,
      count: 0
    },
    onLoad: function({ id, title }) {
      this.setData({ title });
      openBook({ id }).then(res => {
        const count = Math.ceil(res.count / this.data.pageSize);

        this.setData({
          count,
          loaded: true,
          book: res,
          download: res.download
        });

        if (!res.download) {
          this.pollingStatus(id);
        }

        this.setShowList();
      });
    },
    pollingStatus(id) {
      let timer = setInterval(() => {
        getBookStatus({ id }).then(res => {
          if (res.download) {
            this.setData({
              download: true
            });
            wx.showToast({
              title: '下载成功',
              icon: 'succes',
              duration: 1000,
              mask: true
            });
            clearInterval(timer);
          }
        });
      }, 1000);
    },
    setShowList: function() {
      const { page, pageSize, book, sort } = this.data;
      const { content } = book;
      const list = sort ? content : content.reverse();

      this.setData({
        showList: list.slice((page - 1) * pageSize, page * pageSize)
      });
    },
    onUnload() {
      clearInterval(timer);
    },
    sort: function(event) {},
    toPage: function(event) {
      const type = event.detail.type;
      if (type === 'next') {
        this.setData(
          {
            page: this.data.page + 1
          },
          () => {
            this.setShowList();
          }
        );
      } else if (type === 'prev') {
        this.setData(
          {
            page: this.data.page - 1
          },
          () => {
            this.setShowList();
          }
        );
      }
    },
    openActicle: function(event) {
      if (!this.data.download) {
        return wx.showToast({
          title: '请等待下载完毕',
          icon: 'error',
          duration: 1000,
          mask: true
        });
      }
      const { index } = event.currentTarget.dataset;
      wx.navigateTo({
        url: `../article/article?index=${index +
          (this.data.page - 1) * 20}&_id=${this.data.book._id}`
      });
    },
    addToUser: function(event) {
      addBook({
        _id: this.data.book._id,
        openid: this.props.userInfo.openid
      }).then(res => {
          wx.showToast({
            title: '加入成功',
            icon: 'succes',
            duration: 1000,
            mask: true
          });
        });
    }
  })
);
