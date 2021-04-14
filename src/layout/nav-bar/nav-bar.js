import style from './nav-bar.less';
import logo from '@/assets/logo.png';
import { connect } from 'dva';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const NavBar = ({ state, dispatch }) => {
  const { isShowDetailMenu } = state;
  return (
    <div className={style.nav}>
      <div className={style.navLogo}>
        <img src={logo} alt={{}} />
        <div className={style.navProjectName}>React Admin</div>
        <div
          className={style.navPackUpIcon}
          onClick={() => dispatch({ type: 'isShowDetailMenu/toggle' })}
        >
          {isShowDetailMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
    </div>
  );
};

export default connect(state => ({ state }))(NavBar);
