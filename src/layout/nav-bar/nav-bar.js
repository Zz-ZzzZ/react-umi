import style from './nav-bar.less';
import logo from '@/assets/logo.png';
import { useEffect, useState } from 'react';
import { connect } from 'dva';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, Tag } from 'antd';

const getFullTime = () => {
  let date = new Date(), //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
    D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
    h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
    m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
    s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return `${Y}年${M}月${D}日  ${h}时${m}分${s}秒`;
};

const Timer = () => {
  const [time, setTime] = useState(getFullTime());

  useEffect(() => {
    let timer = setInterval(() => setTime(getFullTime()), 1000);
    return () => clearInterval(timer);
  }, [time]);

  return <Tag icon={<ClockCircleOutlined />}>{time}</Tag>;
};

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="https://www.antgroup.com">设置</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="https://www.aliyun.com">退出</a>
    </Menu.Item>
  </Menu>
);

const NavBar = ({ state, dispatch }) => {
  const { isShowDetailMenu } = state;

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
            <span>admin</span>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default connect((state) => ({ state }))(NavBar);
