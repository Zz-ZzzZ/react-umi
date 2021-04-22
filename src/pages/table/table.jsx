import { Table } from 'antd';
import { useEffect, useState } from 'react';
import style from './table.less';
import axios from 'axios';

const { Column } = Table;

const TableExample = () => {
  const [tableData, setTableData] = useState([]);

  const getTableData = async () => {
    const { data } = await axios.get('/api/getTable');
    if (data.result) {
      setTableData(data.list);
    }
  };

  useEffect(() => {
    getTableData();
    return () => {};
  }, []);

  return (
    <div className={style.table}>
      <h2>表格数据</h2>
      <Table dataSource={tableData} rowKey="id">
        <Column title="城市" dataIndex="city" key="city" />
        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="邮件" dataIndex="email" key="email" />
        <Column title="创建时间" dataIndex="createTime" key="createTime" />
      </Table>
    </div>
  );
};
export default TableExample;
