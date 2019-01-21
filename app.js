//app.js
const { addUser } = require('./services/user');

App({
  globalData: {
    appid: 'wx27c1e4ad7ae1b484',
    secret: '1e5c89845a3f3653d7e0848f5b4ef455',
    userInfo: null,
    books: []
  },

  onLaunch: function() {
    const userInfo = wx.getStorageSync('userInfo');

    if (!userInfo) {
      const { appid, secret } = this.globalData;

      wx.login({
        success: resopnse => {
          let userInfo = {};
          wx.getUserInfo({
            success: res => {
              userInfo.avatarUrl = res.userInfo.avatarUrl;
              userInfo.nickName = res.userInfo.nickName;

              wx.request({
                url:
                  'https://api.weixin.qq.com/sns/jscode2session?appid=' +
                  appid +
                  '&secret=' +
                  secret +
                  '&js_code=' +
                  resopnse.code +
                  '&grant_type=authorization_code',
                data: {},
                method: 'GET',
                success: res => {
                  console.log(res);
                  userInfo.openid = res.data.openid;
                  this.globalData.userInfo = userInfo;
                  wx.setStorageSync('userInfo', userInfo);
                  addUser(userInfo).then(res => {
                    this.globalData.init && this.globalData.init();
                  });
                }
              });
            }
          });
        }
      });
    } else {
      this.globalData.userInfo = userInfo;
    }
  },

  getUserBooks: function(userInfo) {}
});
