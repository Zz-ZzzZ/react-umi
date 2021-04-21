import { Menu } from 'antd';
import { BankOutlined, TableOutlined } from '@ant-design/icons';
import { history } from 'umi';
import { connect } from 'dva';

const menuList = [
  {
    key: 1,
    icon: <BankOutlined style={{ fontSize: '16px' }} />,
    name: '总览',
    path: '/',
  },
  {
    key: 2,
    icon: <TableOutlined style={{ fontSize: '16px' }} />,
    name: '表格',
    path: '/table',
  },
];

const MenuBar = ({ state }) => {
  // 菜单收缩控制
  const { isShowDetailMenu } = state;

  // 点击为当前项不做跳转
  const handleClickGoMenuItem = (index) => {
    return menuList[index].path !== history.location.pathname && history.push(menuList[index].path);
  };

  // 根据路由路径判断默认菜单选中项
  const getDefaultKey = () => {
    const menu = menuList.find((item) => item.path === history.location.pathname);
    return menu ? menu.key.toString() : '1';
  };

  return (
    <Menu
      theme="light"
      mode="inline"
      style={{ width: isShowDetailMenu && '200px', height: '100%' }}
      defaultSelectedKeys={[getDefaultKey()]}
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
  );
};
export default connect((state) => ({ state }))(MenuBar);
