function request(url, option) {
  const { method = 'GET', data, query, params } = option;

  if (params) {
    url = url.replace(/\:([\w]+)/g, (word, $1) => {
      return params[$1] ? encodeURIComponent(params[$1]) : word;
    });
  }

  if (query) {
    url +=
      '?' +
      Object.keys(query)
        .map(
          key => encodeURIComponent(key) + '=' + encodeURIComponent(query[key])
        )
        .join('&');
  }

  // url = 'https://fiction.applinzi.com' + url;
  url = 'http://localhost:5050' + url;

  return new Promise((resolve, reject) => {
    wx.request({
      method,
      url,
      data,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        resolve(res.data);
      }
    });
  });
}

module.exports = request;
