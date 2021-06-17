import { memo, useEffect, useRef, useState } from 'react';
import { Chart, LineAdvance } from 'bizcharts';
import { Card } from 'antd';
import { connect } from 'umi';
import { ConnectState } from '@/models/connect';
import { MenuType } from '@/models/menu';
import data from '@/pages/home/line-advance-chart/data';

// antd Card的padding间隔 左12 + 右12
const cardStylePadding = 12 + 12;
// menuBar的宽度 最大200 最小20
const menuBarWidth = 200 - 80;
const LineAdvanceChart = memo(({ isShowDetailMenu }: { isShowDetailMenu: MenuType }) => {
  const lineChartRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // 获取div的动态宽度
    if (lineChartRef.current) {
      setWidth(lineChartRef.current.clientWidth - cardStylePadding);
    }
    return () => {};
  }, []);

  return (
    <div ref={lineChartRef} style={{ width: '100%' }}>
      <Card title="折线图" size="small">
        <Chart
          padding={[10, 20, 50, 40]}
          // 切换menu的同时重新渲染图表
          width={isShowDetailMenu ? width : width + menuBarWidth}
          height={300}
          data={data}
        >
          <LineAdvance shape="smooth" point area position="month*temperature" color="city" />
        </Chart>
      </Card>
    </div>
  );
});

export default connect(({ isShowDetailMenu }: ConnectState) => ({
  isShowDetailMenu,
}))(LineAdvanceChart);
