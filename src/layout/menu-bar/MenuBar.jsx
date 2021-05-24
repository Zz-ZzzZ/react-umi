import { Menu } from 'antd';
import { BankOutlined, TableOutlined, FileMarkdownOutlined } from '@ant-design/icons';
import { history, connect } from 'umi';
import { useState, useMemo } from 'react';
import logo from '@/assets/logo.png';
import style from './MenuBar.less';

const menuList = [
  {
    key: '1',
    icon: <BankOutlined style={{ fontSize: '16px' }} />,
    name: '总览',
    path: '/',
  },
  {
    key: '2',
    icon: <TableOutlined style={{ fontSize: '16px' }} />,
    name: '表格',
    path: '/table',
  },
  {
    key: '3',
    icon: <FileMarkdownOutlined style={{ fontSize: '16px' }} />,
    name: 'MarkDown',
    path: '/mark-down',
  },
];

const MenuBar = ({ state }) => {
  // 菜单收缩控制
  const { isShowDetailMenu } = state;
  const [routePath, setRoutePath] = useState(history.location.pathname);

  // 路由更改不仅会出现在菜单点击还会出现在浏览器前进后退按钮
  // 因此Menu菜单的选中应由路由监听统一管理
  history.listen(({ pathname }) => {
    if (pathname !== routePath) setRoutePath(pathname);
  });

  // 点击为当前项不做跳转
  const handleClickGoMenuItem = (index) => {
    if (menuList[index].path !== history.location.pathname) {
      history.push(menuList[index].path);
    }
  };

  const getMenuKey = useMemo(() => {
    const menu = menuList.find((item) => item.path === routePath);
    return menu ? menu['key'] : '1';
  }, [routePath]);

  return (
    <div className={style.menu}>
      <div className={style.menuLogo} style={{ width: isShowDetailMenu ? '200px' : '80px' }}>
        <img src={logo} alt={{}} />
        {isShowDetailMenu && <span>React Admin</span>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        className={style.menuBlock}
        style={{ width: isShowDetailMenu && '200px' }}
        selectedKeys={[getMenuKey]}
        inlineCollapsed={!isShowDetailMenu}
        onClick={({ item }) => handleClickGoMenuItem(item.props.index)}
      >
        {menuList.map((item) => (
          <Menu.Item key={item.key}>
            {item.icon}
            <span>{item.name}</span>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};
export default connect((state) => ({ state }))(MenuBar);
