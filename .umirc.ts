import router from './src/router/index';
import style from './src/global-var';

// ref: https://umijs.org/config/
export default {
  title: 'React Admin',
  favicon: '/favicon.ico',
  hash: true,
  fastRefresh: {},
  history: { type: 'hash' },
  routes: router,
  theme: style,
  forkTSChecker: {},
};
