export const useUserInfo = () => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const setUserInfo = (info) => sessionStorage.setItem('userInfo', JSON.stringify(info));
  return [userInfo, setUserInfo];
};
