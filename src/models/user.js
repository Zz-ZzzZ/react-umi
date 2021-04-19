const getUserInfoFromStorage = (key) => {
  const user = JSON.parse(sessionStorage.getItem('userInfo'));
  return user ? user[key] : '';
};

const setUserInfoToStorage = (value) => sessionStorage.setItem('userInfo', JSON.stringify(value));

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
  state: JSON.parse(JSON.stringify(initState)),
  reducers: {
    setUserInfo: (state, { payload }) => {
      console.log(state);
      sessionStorage.setItem('userInfo', JSON.stringify(payload));
      return payload;
    },
    // 储存登录账号/密码
    login: (state, { payload }) => {
      const { username, password } = payload;
      const value = { ...state, username, password };
      setUserInfoToStorage(value);
      return value;
    },
    clearUserInfo: () => {
      sessionStorage.removeItem('userInfo');
      return initState;
    },
  },
};
