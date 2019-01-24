//app.js
import login from './utils/login';
import { observer } from './libs/observer';

App(
  observer({
    props: require('./store/index.js').default,

    onLaunch: function() {
      this.login();
    },

    login() {
      login().then(userInfo => {
        this.props.init(userInfo);
      });
    }
  })
);
