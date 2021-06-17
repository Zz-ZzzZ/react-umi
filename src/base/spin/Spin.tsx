import { Spin, SpinProps } from 'antd';
import style from './Spin.less';
import { FC } from 'react';

// 适配百分比布局
const AntdSpinCustom: FC<SpinProps> = ({ children, ...otherProps }) => {
  return (
    <Spin {...otherProps} wrapperClassName={style.loading} className={style.loading}>
      {children}
    </Spin>
  );
};

export default AntdSpinCustom;
