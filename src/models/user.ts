const getUserInfoFromStorage = (key: string) => {
  const user = JSON.parse(<string>sessionStorage.getItem('userInfo'));
  return user ? user[key] : '';
};

const setUserInfoToStorage = (value: string) =>
  sessionStorage.setItem('userInfo', JSON.stringify(value));

const initState = {
  username: getUserInfoFromStorage('username'),
  password: getUserInfoFromStorage('password'),
  name: '',
  tel: '',
  address: '',
};

export default {
  namespace: 'userInfo',
  // 深拷贝一份用作清除登录数据
  state: { ...initState },
  reducers: {
    setUserInfo: (state: any, { payload }: any) => {
      const { name, tel, address } = payload;
      const value = { ...state, name, tel, address };
      setUserInfoToStorage(value);
      return value;
    },
    // 储存登录账号/密码
    login: (state: any, { payload }: any) => {
      const { username, password } = payload;
      const value = { ...state, username, password };
      setUserInfoToStorage(value);
      return value;
    },
    clearUserInfo: () => {
      sessionStorage.removeItem('userInfo');
      return { ...initState };
    },
  },
};
