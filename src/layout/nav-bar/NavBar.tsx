import style from './NavBar.less';
import { history, connect, Dispatch } from 'umi';
import { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, Modal, notification, Avatar } from 'antd';
import Timer from '@/base/timer/Timer';
import { getUser } from '@/api/user';
import userAvatar from '../../../public/favicon.ico';
import { ConnectState } from '@/models/connect';

const { confirm } = Modal;

const NavBar = ({ state, dispatch }: { state: ConnectState; dispatch: Dispatch }) => {
  const [userInfo, setUserInfo] = useState<{ name: string }>({ name: '' });
  const { isShowDetailMenu } = state;

  const getUserInfo = async () => {
    const { data } = await getUser();
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
      onOk() {
        dispatch({ type: 'userInfo/clearUserInfo' });
        notification.success({
          message: '通知',
          description: '已成功退出当前用户',
        });
        history.replace('/login');
      },
    });
  };

  const handleClickMenu = (key: string) => {
    switch (key) {
      case '0':
        if (history.location.pathname !== '/person') {
          history.push('/person');
        }
        return;
      case '1':
        showExitLoginConfirm();
        return;
    }
  };

  const menu = (
    <Menu onClick={({ key }) => handleClickMenu(key as string)}>
      <Menu.Item key="0">
        <span>个人设置</span>
      </Menu.Item>
      <Menu.Item key="1">
        <span>退出登录</span>
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
          <Timer />
        </div>
        <Dropdown overlay={menu} trigger={['click']}>
          <div className={style.navRightUser}>
            <Avatar src={userAvatar} size="small" />
            <span>{userInfo.name}</span>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default connect((state: ConnectState) => ({ state }))(NavBar);
