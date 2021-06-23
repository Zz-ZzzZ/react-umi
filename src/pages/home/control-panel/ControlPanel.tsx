import { memo, FC } from 'react';
import { Statistic } from 'antd';
import style from './ControlPanel.less';
import Card from '@/base/card/Card';

const ControlPanel: FC<{ panelList: Array<any> }> = memo(({ panelList }) => {
  return (
    <div className={style.panel}>
      {panelList.map((item, index) => (
        <Card cardClassName={`${style.panelItem}`} key={item.id}>
          <div className={style.panelItemBlock}>
            <div className={style.panelItemIcon}>{item.icon}</div>
            <div className={style.panelItemLabel}>
              <Statistic title={item.label} value={item.num} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
});

export default ControlPanel;
