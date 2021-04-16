import { Redirect } from 'umi';
import { useUserInfo } from '@/utils/custom-hooks';

// 登陆权限校验
export default ({ children }) => {
  const [userInfo] = useUserInfo();
  if (userInfo) {
    return <div>{children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
};
