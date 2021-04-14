import NavBar from '../layout/nav-bar/nav-bar';
import MenuBar from '../layout/menu-bar/menu-bar';
import style from './index.less';
import withRouter from 'umi/withRouter';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ANIMATION_MAP = {
  PUSH: 'forward',
  POP: 'back',
};

const Index = withRouter(({ children, location, history }) => {
  return (
    <div className={style.main}>
      <NavBar />
      <div className={style.container}>
        <div className={style.containerLeft}>
          <MenuBar location={location} />
        </div>
        <div className={style.containerRight}>
          <TransitionGroup
            childFactory={child => {
              return React.cloneElement(child, { classNames: 'forward' });
            }}
            style={{ width: '100%', height: '100%', position: 'relative' }}
          >
            <CSSTransition key={location.pathname} timeout={1000}>
              {children}
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
});

export default Index;
