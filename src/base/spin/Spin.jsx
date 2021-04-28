import { Spin } from 'antd';
import style from './Spin.less';

// 适配百分比布局
const AntdSpinCustom = (props) => {
  const { children } = props;
  return (
    <Spin {...props} wrapperClassName={style.loading}>
      {children}
    </Spin>
  );
};

export default AntdSpinCustom;
