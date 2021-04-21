import { useEffect, useState } from 'react';
import { Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const Timer = () => {
  const getFullTime = () => {
    let date = new Date(), //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      Y = date.getFullYear() + '',
      M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
      D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
      h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
      m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
      s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return `${Y}年${M}月${D}日  ${h}时${m}分${s}秒`;
  };

  const [time, setTime] = useState(getFullTime());

  useEffect(() => {
    let timer = setInterval(() => setTime(getFullTime()), 1000);
    return () => clearInterval(timer);
  }, [time]);

  return <Tag icon={<ClockCircleOutlined />}>{time}</Tag>;
};

export default Timer;
