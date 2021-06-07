export interface IUserInfo {
  name: string;
  tel: string;
  address: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IUser extends IUserInfo, ILogin {}

const getUserInfoFromStorage = (key: string) => {
  const user = JSON.parse(<string>sessionStorage.getItem('userInfo'));
  return user ? user[key] : '';
};

const setUserInfoToStorage = (value: IUserInfo | ILogin) =>
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
  // 拷贝一份用作清除登录数据
  state: { ...initState },
  reducers: {
    setUserInfo: (state: IUser, { payload }: { payload: IUserInfo }) => {
      const { name, tel, address } = payload;
      const value = { ...state, name, tel, address };
      setUserInfoToStorage(value);
      return value;
    },
    // 储存登录账号/密码
    login: (state: IUser, { payload }: { payload: ILogin }) => {
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
