import style from './Home.less';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { CloudTwoTone, SoundTwoTone, StarTwoTone, FireTwoTone } from '@ant-design/icons';
import ControlPanel from '@/pages/home/control-panel/ControlPanel';
import LabelLine from '@/pages/home/label-line/LabelLine';
import ControlChart from '@/pages/home/control-chart/ControlChart';
import LineAdvanceChart from '@/pages/home/line-advance-chart/LineAdvanceChart';

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
  const [toDoList, setToDoList] = useState<Array<any>>([]);
  const lineRef = useRef(null);

  const getControlPanel = async () => {
    const { data } = await axios.get('/api/control');
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

  const getToDoList = async () => {
    const { data } = await axios.get('/api/todo');
    if (data.length > 0) {
      setToDoList(data);
    }
  };

  // 跳过就删除此项
  const handleClickPassItem = (id: number): void => {
    const list = toDoList.filter((item: any) => item.id !== id);
    setToDoList(list);
  };

  // 完成某一项打一个标识
  const handleClickSuccessItem = (id: number): void => {
    const list = [...toDoList] as Array<any>;
    const index = list.findIndex((item: any) => item.id === id);
    if (id !== -1) {
      list[index]['isSuccess'] = true;
    }
    setToDoList(list);
  };

  useEffect(() => {
    getControlPanel();
    getToDoList();
    return () => {};
  }, []);

  return (
    <div className={`container ${style.home}`}>
      <ControlPanel panelList={controlPanel} />
      <div className={style.lineBlock} ref={lineRef}>
        <LineAdvanceChart />
      </div>
      <div className={style.chartAndTodo}>
        <div className={style.chart}>
          <ControlChart chartData={controlPanel} />
        </div>
        <div className={style.toDo}>
          <LabelLine />
        </div>
      </div>
    </div>
  );
};

export default Home;
