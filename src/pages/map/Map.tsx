import React, { memo, useEffect, useState } from 'react';
import AntdSpinCustom from '@/base/spin/Spin';
import { Card } from 'antd';
import { Map as AMap } from 'react-amap';
import style from './Map.less';

const MAP_KEY = '84dfcdb9f3fb752f2cae43be33c79bdc';

const Map = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`container ${style.map}`}>
      <Card title="地图示例">
        {/*<AMap amapkey={MAP_KEY} />*/}
        <AntdSpinCustom spinning={loading}>{!loading && <AMap amapkey={MAP_KEY} />}</AntdSpinCustom>
      </Card>
    </div>
  );
};

export default memo(Map);
