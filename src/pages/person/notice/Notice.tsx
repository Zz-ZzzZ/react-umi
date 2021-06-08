import style from '../Person.less';
import { Switch, message } from 'antd';
import { memo } from 'react';

const Notice = () => {
  const handleChangeSwitch = (e: boolean) => {
    return e ? message.success('已开启系统消息通知') : message.error('已关闭系统消息通知');
  };

  return (
    <div className={style.betweenItem}>
      <div>
        <h4>系统消息</h4>
        <div className={style.tipColor}>系统消息将以站内信的形式通知</div>
      </div>
      <Switch
        checkedChildren="开启"
        unCheckedChildren="关闭"
        defaultChecked
        onChange={handleChangeSwitch}
      />
    </div>
  );
};

export default memo(Notice);
