import { memo, FC } from 'react';
import { Card, Statistic, Tag } from 'antd';
import style from './ControlPanel.less';

const ControlPanel: FC<{ panelList: Array<any> }> = memo(({ panelList }) => {
  return (
    <div className={style.panel}>
      {panelList.map((item) => (
        <div className={style.panelItem} key={item.id}>
          <Card
            title={item.label}
            size="small"
            extra={<Tag color={item.tagColor}>{item.tagText}</Tag>}
          >
            <div className={style.panelItemBlock}>
              <div className={style.panelItemIcon}>{item.icon}</div>
              <div className={style.panelItemLabel}>
                <Statistic title={item.label} value={item.num} />
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
});

export default ControlPanel;
