import { Reducer } from 'umi';

export interface IUserInfo {
  name: string;
  tel: string;
  address: string;
}

export interface IUserLogin {
  username: string;
  password: string;
  remember: boolean;
}

export type UserType = IUserInfo & IUserLogin;

type UserModelType = {
  namespace: string;
  state: UserType;
  reducers: {
    setUserInfo: Reducer<IUserInfo>;
    login: Reducer<IUserLogin>;
    clearUserInfo: Reducer;
  };
};

const getUserInfoFromStorage = (key: string) => {
  const user = JSON.parse(<string>sessionStorage.getItem('userInfo'));
  return user ? user[key] : '';
};

const setUserInfoToStorage = (value: IUserInfo | IUserLogin) =>
  sessionStorage.setItem('userInfo', JSON.stringify(value));

const initState = {
  username: getUserInfoFromStorage('username'),
  password: getUserInfoFromStorage('password'),
  name: '',
  tel: '',
  address: '',
  remember: false,
};

const UserModel: UserModelType = {
  namespace: 'userInfo',
  // 拷贝一份用作清除登录数据
  state: { ...initState },
  reducers: {
    setUserInfo: (state, action) => {
      const { payload } = action;
      const { name, tel, address } = payload;
      const value = { ...state, name, tel, address };
      setUserInfoToStorage(value);
      return value;
    },
    // 储存登录账号/密码
    login: (state, action) => {
      const { payload } = action;
      const { username, password, remember } = payload;
      const value = { ...state, username, password, remember };
      setUserInfoToStorage(value);
      return value;
    },
    clearUserInfo: () => {
      sessionStorage.removeItem('userInfo');
      return { ...initState };
    },
  },
};

export default UserModel;
