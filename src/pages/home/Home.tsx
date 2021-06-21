import style from './Home.less';
import { useEffect, useState } from 'react';
import { getControlPanel } from '@/api/home';
import { CloudTwoTone, SoundTwoTone, StarTwoTone, FireTwoTone } from '@ant-design/icons';
import ControlPanel from '@/pages/home/control-panel/ControlPanel';
import LabelLineChart from '@/pages/home/label-line-chart/LabelLineChart';
import ControlChart from '@/pages/home/control-chart/ControlChart';
import LineAdvanceChart from '@/pages/home/line-advance-chart/LineAdvanceChart';
import AreaChart from '@/pages/home/area-chart/AreaChart';

const controlPanelStatic: Array<any> = [
  {
    id: 1,
    icon: <CloudTwoTone />,
    label: '访问人数',
    key: 'visitation',
    tagColor: 'volcano',
    tagText: '年',
  },
  {
    id: 2,
    icon: <SoundTwoTone twoToneColor={'#36cfc9'} />,
    label: '通知',
    key: 'notification',
    tagColor: 'gold',
    tagText: '日',
  },
  {
    id: 3,
    icon: <StarTwoTone twoToneColor={'#ff4d4f'} />,
    label: '收藏',
    key: 'collect',
    tagColor: 'cyan',
    tagText: '月',
  },
  {
    id: 4,
    icon: <FireTwoTone twoToneColor={'#faad14'} />,
    label: '活跃',
    key: 'active',
    tagColor: 'geekblue',
    tagText: '日',
  },
];

const Home = () => {
  const [controlPanel, setControlPanel] = useState<Array<any>>([]);

  const initControlPanel = async () => {
    const { data } = await getControlPanel();
    if (JSON.stringify(data)) {
      for (const item of controlPanelStatic) {
        // 根据数组内的key与后台数据返回的字段作比对
        if (data.hasOwnProperty(item['key'])) {
          item['num'] = data[item['key']];
        }
      }
      setControlPanel(controlPanelStatic);
    }
  };

  useEffect(() => {
    initControlPanel();
    return () => {};
  }, []);

  return (
    <div className={`container ${style.home}`}>
      <div className={style.controlPanel}>
        <ControlPanel panelList={controlPanel} />
      </div>
      <div className={style.lineChart}>
        <LineAdvanceChart />
      </div>
      <div className={style.otherChart}>
        <div className={style.otherChartItem}>
          <ControlChart chartData={controlPanel} />
        </div>
        <div className={style.otherChartItem}>
          <LabelLineChart />
        </div>
        <div className={style.otherChartItem}>
          <AreaChart />
        </div>
      </div>
    </div>
  );
};

export default Home;
