import style from './home.less';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CloudTwoTone, SoundTwoTone, StarTwoTone, FireTwoTone } from '@ant-design/icons';
import ControlPanel from './control-panel/control-panel';
import TodoList from './todo-list/todo-list';
import HomeChart from './home-chart/home-chart';

const controlPanelStatic = [
  {
    id: 1,
    icon: <CloudTwoTone />,
    label: '访问人数',
    key: 'visitation',
  },
  {
    id: 2,
    icon: <SoundTwoTone twoToneColor={'#36cfc9'} />,
    label: '通知',
    key: 'notification',
  },
  {
    id: 3,
    icon: <StarTwoTone twoToneColor={'#ff4d4f'} />,
    label: '收藏',
    key: 'collect',
  },
  {
    id: 4,
    icon: <FireTwoTone twoToneColor={'#faad14'} />,
    label: '活跃',
    key: 'active',
  },
];

const Home = () => {
  const [controlPanel, setControlPanel] = useState([]);
  const [toDoList, setToDoList] = useState([]);

  const getControlPanel = async () => {
    const { data } = await axios.get('/api/control');
    if (JSON.stringify(data)) {
      for (const item of controlPanelStatic) {
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

  const handleClickPassItem = id => {
    const list = toDoList.filter(item => item.id !== id);
    setToDoList(list);
  };

  const handleClickSuccessItem = id => {
    const list = [...toDoList];
    const index = list.findIndex(item => item.id === id);
    if (id !== -1) {
      list[index]['isSuccess'] = true;
    }
    setToDoList(list);
  };

  useEffect(() => {
    getControlPanel();
    getToDoList();
  }, []);

  return (
    <div className={style.main}>
      <ControlPanel panelList={controlPanel} />
      <div className={style.chartAndTodo}>
        <div className={style.chart}>
          <HomeChart chartData={controlPanel} />
        </div>
        <div className={style.toDo}>
          <TodoList
            toDoList={toDoList}
            handleClickPassItem={handleClickPassItem}
            handleClickSuccessItem={handleClickSuccessItem}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
