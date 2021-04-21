import style from './table.less';
import { Table } from 'antd';

const TableExample = () => {
  return (
    <div className={style.table}>
      <h2>表格数据</h2>
      <div className={style.container}></div>
    </div>
  );
};
export default TableExample;
