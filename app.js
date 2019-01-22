//app.js
import login from './utils/login';
import { observer } from './libs/observer';

App(
  observer({
    props: require('./store/index.js').default,

    globalData: {
      userInfo: null
    },

    onLaunch: function() {
      login().then(userInfo => {
        this.props.init(userInfo);
      });
    }
  })
);
