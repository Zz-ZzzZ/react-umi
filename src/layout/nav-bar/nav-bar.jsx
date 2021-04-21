import style from './nav-bar.less';
import logo from '@/assets/logo.png';
import { connect } from 'dva';
import { history } from 'umi';
import { useRef, useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, Modal, notification, Drawer } from 'antd';
import Timer from '@/base/timer/timer';
import UserDrawer from '@/layout/nav-bar/user-drawer/user-drawer';
import axios from 'axios';

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

  const showUserDrawer = () => {
    userDrawer.current.showDrawer();
  };

  const showExitLoginConfirm = () => {
    confirm({
      title: '退出登录',
      icon: <ExclamationCircleOutlined />,
      content: '确定要退出登录吗',
      async onOk() {
        const { data } = await axios.post('/api/exitLogin', { username });
        if (data.result) {
          dispatch({ type: 'userInfo/clearUserInfo' });
          history.replace('/login');
          notification.success({
            message: '通知',
            description: '已成功退出当前用户',
          });
        }
      },
    });
  };

  const handleClickMenu = ({ key }) => {
    switch (key) {
      case '0':
        showUserDrawer();
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
      <div className={style.navLeft}>
        <img src={logo} alt={{}} />
        <div className={style.navLeftName}>React Admin</div>
        <div
          className={style.navLeftPackUpIcon}
          onClick={() => dispatch({ type: 'isShowDetailMenu/toggle' })}
        >
          {isShowDetailMenu ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </div>
      </div>
      <div className={style.navRight}>
        <div className={style.navRightTimer}>
          <Timer />
        </div>
        <Dropdown overlay={menu} trigger={['click']}>
          <div className={style.navRightUser}>
            <UserOutlined className={style.navRightUserIcon} />
            <span>{userInfo.name}</span>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
      <UserDrawer
        ref={userDrawer}
        userInfo={userInfo}
        handleChangeUserSuccess={() => getUserInfo()}
      />
    </div>
  );
};

export default connect((state) => ({ state }))(NavBar);
