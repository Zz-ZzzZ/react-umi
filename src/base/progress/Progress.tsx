import { useEffect, useState } from 'react';
import style from './Progress.less';

const Progress = ({ location }: { location: string }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(100);
    const timer = setTimeout(() => {
      setProgress(0);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [location]);

  return (
    <div
      className={style.progress}
      style={{ width: `${progress}%`, opacity: progress === 0 ? '0' : '1' }}
    />
  );
};

export default Progress;
