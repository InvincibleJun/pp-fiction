const { appid, secret } = require('../config.js');
const { addUser } = require('../services/user');

module.exports = function login() {
  return new Promise((resolve, reject) => {
    const userInfo = wx.getStorageSync('userInfo');

    if (!userInfo) {
      wx.login({
        success: resopnse => {
          let userInfo = {};

          // 获得用户头像信息
          wx.getUserInfo({
            success: res => {
              userInfo.avatarUrl = res.userInfo.avatarUrl;
              userInfo.nickName = res.userInfo.nickName;

              // 获得openid
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
                  userInfo.openid = res.data.openid;
                  // 服务端保存
                  addUser(userInfo).then(res => {
                    wx.setStorageSync('userInfo', res);
                    resolve(res);
                  });
                }
              });
            }
          });
        }
      });
    } else {
      addUser(userInfo).then(res => {
        wx.setStorageSync('userInfo', res);
        resolve(res);
      });
    }
  });
};
