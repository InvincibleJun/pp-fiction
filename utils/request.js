function request(url, option) {
  const { method = "GET", data, query, params } = option;
  const { openid } = wx.getStorageSync("userInfo");
  if (params) {
    url = url.replace(/\:([\w]+)/g, (word, $1) => {
      return params[$1] ? encodeURIComponent(params[$1]) : word;
    });
  }

  if (query) {
    url +=
      "?" +
      Object.keys(query)
        .map(
          key => encodeURIComponent(key) + "=" + encodeURIComponent(query[key])
        )
        .join("&");
  }

  url = 'https://fiction.applinzi.com' + url;
  // url = "http://localhost:8888" + url;

  return new Promise((resolve, reject) => {
    wx.request({
      method,
      url,
      data,
      header: {
        openid,
        "content-type": "application/json"
      },
      success(res) {
        resolve(res.data);
      }
    });
  });
}

module.exports = request;
