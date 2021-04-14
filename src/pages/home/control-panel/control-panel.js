import style from './control-panel.less';
import { memo } from 'react';

const ControlPanel = memo(({ panelList }) => {
  return (
    <div className={style.panel}>
      {panelList.map(item => (
        <div className={style.panelItem} key={item.id}>
          <div className={style.panelItemIcon}>{item.icon}</div>
          <div className={style.panelItemLabel}>
            <div>{item.label}</div>
            <div>{item.num}</div>
          </div>
        </div>
      ))}
    </div>
  );
});

export default ControlPanel;
