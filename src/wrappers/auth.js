import { Redirect, useStore } from 'umi';

// 登陆权限校验
export default ({ children }) => {
  const store = useStore().getState();
  const {
    userInfo: { username, password },
  } = store;
  if (username && password) {
    return <>{children}</>;
  } else {
    return <Redirect to="/login" />;
  }
};
