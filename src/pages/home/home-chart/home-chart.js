import { Chart, Interval, Tooltip, Axis, Coordinate, Interaction, getTheme } from 'bizcharts';
import { memo } from 'react';

const HomeChart = memo(({ chartData }) => {
  const cols = {
    percent: {
      formatter: val => {
        val = val * 100 + '%';
        return val;
      },
    },
  };

  return (
    <Chart height={400} data={chartData} scale={cols} autoFit>
      <Coordinate type="theta" radius={0.75} />
      <Tooltip showTitle={false} />
      <Axis visible={false} />
      <Interval
        position="num"
        adjust="stack"
        color="label"
        style={{
          lineWidth: 1,
          stroke: '#fff',
        }}
        label={[
          'num',
          {
            content: data => {
              return `${data.label}: ${data.num}`;
            },
          },
        ]}
        state={{
          selected: {
            style: t => {
              const res = getTheme().geometries.interval.rect.selected.style(t);
              return { ...res, fill: 'red' };
            },
          },
        }}
      />
      <Interaction type="element-single-selected" />
    </Chart>
  );
});

export default HomeChart;
