import { memo } from 'react';
import { Chart, LineAdvance } from 'bizcharts';
import { Card } from 'antd';
import data from '@/pages/home/line-advance-chart/data';

const LineAdvanceChart = memo(() => {
  return (
    <Card title="折线图" size="small">
      <Chart
        padding={[10, 20, 50, 40]}
        // 以动态更改width的方式可以不需要重新渲染图表
        autoFit
        height={300}
        data={data}
      >
        <LineAdvance shape="smooth" point area position="month*temperature" color="city" />
      </Chart>
    </Card>
  );
});

export default LineAdvanceChart;
