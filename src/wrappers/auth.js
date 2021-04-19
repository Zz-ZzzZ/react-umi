import { Redirect, useStore } from 'umi';

// 登陆权限校验
export default ({ children }) => {
  const store = useStore().getState();
  if (Object.keys(store.userInfo).length !== 0) {
    return <>{children}</>;
  } else {
    return <Redirect to="/login" />;
  }
};
