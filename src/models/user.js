export default {
  namespace: 'userInfo',
  state: JSON.parse(sessionStorage.getItem('userInfo')) || {},
  reducers: {
    setUserInfo: (state, { payload }) => {
      sessionStorage.setItem('userInfo', JSON.stringify(payload));
      return payload;
    },
  },
};
