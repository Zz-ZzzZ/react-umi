import router from './src/router/index';
import style from './src/global-var';
// ref: https://umijs.org/config/
export default {
  history: { type: 'hash' },
  routes: router,
  theme: style,
};
