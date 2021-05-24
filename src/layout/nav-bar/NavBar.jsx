import style from './NavBar.less';
import logo from '@/assets/logo.png';
import { history, connect } from 'umi';
import { useRef, useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, Modal, notification, Avatar } from 'antd';
import Tmer from '@/base/timer/timer';
import UserDrawer from '@/layout/nav-bar/user-drawer/UserDrawer';
import axios from 'axios';
import userAvatar from '../../../public/favicon.ico';

const { confirm } = Modal;

const NavBar = ({ state, dispatch }) => {
  const [userInfo, setUserInfo] = useState({});
  const userDrawer = useRef(null);
  const {
    isShowDetailMenu,
    userInfo: { username },
  } = state;

  const getUserInfo = async () => {
    const { data } = await axios.get('/api/getUser');
    setUserInfo(data);
    dispatch({ type: 'userInfo/setUserInfo', payload: data });
  };

  useEffect(() => {
    getUserInfo();
    return () => {};
  }, []);

  const showExitLoginConfirm = () => {
    confirm({
      title: '退出登录',
      icon: <ExclamationCircleOutlined />,
      content: '确定要退出登录吗',
      async onOk() {
        const { data } = await axios.post('/api/exitLogin', { username });
        if (data.result) {
          await dispatch({ type: 'userInfo/clearUserInfo' });
          notification.success({
            message: '通知',
            description: '已成功退出当前用户',
          });
          history.replace('/login');
        }
      },
    });
  };

  const handleClickMenu = ({ key }) => {
    switch (key) {
      case '0':
        userDrawer.current.showDrawer(userInfo);
        return;
      case '1':
        showExitLoginConfirm();
        return;
    }
  };

  const menu = (
    <Menu onClick={handleClickMenu}>
      <Menu.Item key="0">
        <span>设置</span>
      </Menu.Item>
      <Menu.Item key="1">
        <span>退出</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={style.nav}>
      <div
        className={style.navLeftPackUpIcon}
        onClick={() => dispatch({ type: 'isShowDetailMenu/toggle' })}
      >
        {isShowDetailMenu ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </div>
      <div className={style.navRight}>
        <div className={style.navRightTimer}>
          <Tmer />
        </div>
        <Dropdown overlay={menu} trigger={['click']}>
          <div className={style.navRightUser}>
            <Avatar src={userAvatar} size="small" />
            <span>{userInfo.name}</span>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
      <UserDrawer ref={userDrawer} handleChangeUserSuccess={getUserInfo} />
    </div>
  );
};

export default connect((state) => ({ state }))(NavBar);
