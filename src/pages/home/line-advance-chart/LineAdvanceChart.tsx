import { memo, useEffect, useRef, useState } from 'react';
import { Chart, LineAdvance } from 'bizcharts';
import { Card } from 'antd';
import { connect } from 'umi';

const data = [
  {
    month: 'Jan',
    city: 'Tokyo',
    temperature: 7,
  },
  {
    month: 'Jan',
    city: 'London',
    temperature: 3.9,
  },
  {
    month: 'Feb',
    city: 'Tokyo',
    temperature: 13,
  },
  {
    month: 'Feb',
    city: 'London',
    temperature: 4.2,
  },
  {
    month: 'Mar',
    city: 'Tokyo',
    temperature: 16.5,
  },
  {
    month: 'Mar',
    city: 'London',
    temperature: 5.7,
  },
  {
    month: 'Apr',
    city: 'Tokyo',
    temperature: 14.5,
  },
  {
    month: 'Apr',
    city: 'London',
    temperature: 8.5,
  },
  {
    month: 'May',
    city: 'Tokyo',
    temperature: 10,
  },
  {
    month: 'May',
    city: 'London',
    temperature: 11.9,
  },
  {
    month: 'Jun',
    city: 'Tokyo',
    temperature: 7.5,
  },
  {
    month: 'Jun',
    city: 'London',
    temperature: 15.2,
  },
  {
    month: 'Jul',
    city: 'Tokyo',
    temperature: 9.2,
  },
  {
    month: 'Jul',
    city: 'London',
    temperature: 17,
  },
  {
    month: 'Aug',
    city: 'Tokyo',
    temperature: 14.5,
  },
  {
    month: 'Aug',
    city: 'London',
    temperature: 16.6,
  },
  {
    month: 'Sep',
    city: 'Tokyo',
    temperature: 9.3,
  },
  {
    month: 'Sep',
    city: 'London',
    temperature: 14.2,
  },
  {
    month: 'Oct',
    city: 'Tokyo',
    temperature: 8.3,
  },
  {
    month: 'Oct',
    city: 'London',
    temperature: 10.3,
  },
  {
    month: 'Nov',
    city: 'Tokyo',
    temperature: 8.9,
  },
  {
    month: 'Nov',
    city: 'London',
    temperature: 5.6,
  },
  {
    month: 'Dec',
    city: 'Tokyo',
    temperature: 5.6,
  },
  {
    month: 'Dec',
    city: 'London',
    temperature: 9.8,
  },
];

// antd Card的padding间隔 左12 + 右12
const cardStylePadding = 12 + 12;
// menuBar的宽度 最大200 最小20
const menuBarWidth = 200 - 80;
const LineAdvanceChart = memo(({ state }: { state: any }) => {
  const { isShowDetailMenu }: { isShowDetailMenu: boolean } = state;
  const lineChartRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // 获取div的动态宽度
    // @ts-ignore
    setWidth(lineChartRef.current.clientWidth - cardStylePadding);
    return () => {};
  }, []);

  return (
    <div ref={lineChartRef} style={{ width: '100%' }}>
      <Card title="折线图" style={{ width: '100%' }} size="small">
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

export default connect((state) => ({ state }))(LineAdvanceChart);
