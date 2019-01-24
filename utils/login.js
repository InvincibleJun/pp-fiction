const { appid, secret } = require('../config.js');
const { addUser } = require('../services/user');
const { $Toast } = require('../dist/base/index');

module.exports = function login() {
  return new Promise((resolve, reject) => {
    const userInfo = wx.getStorageSync('userInfo');

    if (!userInfo) {
      wx.login({
        success: resopnse => {
          let userInfo = {};

          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                $Toast({
                  content: '正在登录',
                  icon: 'prompt',
                  duration: 0,
                  mask: false
                });
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: res => {
                    console.log(res.userInfo);
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
                        userInfo.openid = res.data.openid;
                        // 服务端保存
                        addUser(userInfo).then(res => {
                          $Toast.hide();
                          wx.setStorageSync('userInfo', res);
                          resolve(res);
                        });
                      }
                    });
                  }
                });
              } else {
                reject('未授权');
              }
            }
          });
        }
      });
    } else {
      resolve(userInfo);
    }
  });
};
