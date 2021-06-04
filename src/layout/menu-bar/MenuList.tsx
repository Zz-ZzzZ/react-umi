import { BankOutlined, FileMarkdownOutlined, TableOutlined, UserOutlined } from '@ant-design/icons';
const menuList = [
  {
    key: '1',
    icon: <BankOutlined />,
    name: '总览',
    path: '/',
  },
  {
    key: '2',
    icon: <TableOutlined />,
    name: '表格',
    path: '/table',
  },
  {
    key: '3',
    icon: <FileMarkdownOutlined />,
    name: 'MarkDown',
    path: '/mark-down',
  },
  {
    key: '4',
    icon: <UserOutlined />,
    name: '个人信息',
    path: '/person',
  },
];

export default menuList;
