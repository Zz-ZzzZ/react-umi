import NavBar from '../layout/nav-bar/nav-bar';
import MenuBar from '../layout/menu-bar/menu-bar';
import style from './index.less';
import { withRouter } from 'umi';
import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
            childFactory={child => React.cloneElement(child, { classNames: 'forward' })}
            className={style.transitionBox}
          >
            <CSSTransition key={location.pathname} timeout={500}>
              {children}
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
});

export default Index;
