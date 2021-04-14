import NavBar from '../layout/nav-bar/nav-bar';
import style from './index.less';
import MenuBar from '../layout/menu-bar/menu-bar';

const Index = ({ children, location }) => {
  return (
    <div className={style.main}>
      <NavBar />
      <div className={style.container}>
        <div className={style.containerLeft}>
          <MenuBar location={location} />
        </div>
        <div className={style.containerRight}>{children ? children : null}</div>
      </div>
    </div>
  );
};

export default Index;
