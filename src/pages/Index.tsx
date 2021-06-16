import NavBar from '@/layout/nav-bar/NavBar';
import MenuBar from '@/layout/menu-bar/MenuBar';
import Progress from '@/base/progress/Progress';
import style from './Index.less';
import { withRouter } from 'umi';
import React, { ReactElement } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Index = withRouter(({ children, location, history }) => {
  return (
    <div className={style.main}>
      <div className={style.mainLeft}>
        <MenuBar />
      </div>
      <div className={style.mainRight}>
        <div className={style.mainRightTop}>
          <NavBar />
        </div>
        <div className={style.mainRightBottom}>
          <TransitionGroup
            childFactory={(child: ReactElement) =>
              React.cloneElement(child, { classNames: 'forward' })
            }
            className={style.transitionBox}
          >
            <CSSTransition key={location.pathname} timeout={500}>
              {children}
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
      <Progress location={location.pathname} />
    </div>
  );
});

export default Index;
