import { Table, Input, Select, Button, Space, Modal, message, Card } from 'antd';
import { useEffect, useRef, useState, ChangeEvent } from 'react';
import style from './Table.less';
import axios from 'axios';
import { FileExcelOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { debounce } from '@/utils/utils';
import XLSX from 'xlsx';
import RowDrawer, { IRowDrawerRef } from '@/pages/table/row-drawer/RowDrawer';
import AntdSpinCustom from '@/base/spin/Spin';

const { Column } = Table;
const { Option } = Select;
const { confirm } = Modal;

let tableDataCopy: Array<any> = [];
const TableExample = () => {
  const [tableData, setTableData] = useState<Array<any>>([]);
  const [condition, setCondition] = useState('city');
  const [isLoading, setLoading] = useState(false);
  const rowDrawer = useRef<IRowDrawerRef>(null);

  const getTableData = async () => {
    setLoading(true);
    const { data } = await axios.get('/api/getTable');
    if (data.result) {
      setTableData(data.list);
      tableDataCopy = [...data.list];
    }
    setLoading(false);
  };

  useEffect(() => {
    getTableData();
    return () => {};
  }, []);

  const handleSearch = debounce((value: string) => {
    const filter: Array<any> = tableDataCopy.filter(
      (item) => item[condition].toLowerCase().indexOf(value) !== -1,
    );
    setTableData(filter);
  }, 500);

  const handleExportFile = () => {
    const options = {
      '!cols': [{ wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }, { wpx: 200 }],
    };
    const ws = XLSX.utils.json_to_sheet(tableDataCopy);
    ws['!cols'] = options['!cols'];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'xlsx文件导出demo');
    XLSX.writeFile(wb, 'xlsx文件导出demo.xlsx');
  };

  const handleClickDelItem = (id: number, name: string) => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: `确定删除 ${name} ?`,
      onOk: async () => {
        const { data } = await axios.post('/api/delTableRowById', { id });
        if (data.result) {
          message.success('删除成功');
          getTableData();
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const selectSearchElement = (
    <Select
      defaultValue={condition}
      className="select-before"
      onChange={(value) => setCondition(value)}
    >
      <Option value="city">按城市搜索</Option>
      <Option value="name">按姓名搜索</Option>
      <Option value="email">按邮件搜索</Option>
    </Select>
  );

  return (
    <div className={`container`}>
      <Card title="表格示例">
        <div className={style.tableAction}>
          <div className={style.tableActionInput}>
            <Input
              placeholder="输入关键词"
              addonBefore={selectSearchElement}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
            />
          </div>
          <Button
            type="primary"
            className={style.tableActionButton}
            icon={<FileExcelOutlined />}
            onClick={handleExportFile}
          >
            导出文件
          </Button>
        </div>
        <AntdSpinCustom spinning={isLoading}>
          <Table dataSource={tableData} rowKey="id" pagination={{ showSizeChanger: false }}>
            <Column title="城市" dataIndex="city" key="city" ellipsis={true} />
            <Column title="姓名" dataIndex="name" key="name" width={200} ellipsis={true} />
            <Column title="邮件" dataIndex="email" key="email" width={200} ellipsis={true} />
            <Column
              title="创建时间"
              dataIndex="createTime"
              key="createTime"
              width={200}
              ellipsis={true}
            />
            <Column
              title="操作"
              dataIndex="action"
              key="action"
              width={200}
              render={(text, record: { id: number; name: string }) => (
                <Space size="middle">
                  <Button
                    size="small"
                    onClick={() => rowDrawer.current && rowDrawer.current.showRowDrawer(record)}
                  >
                    修改
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => handleClickDelItem(record.id, record.name)}
                  >
                    删除
                  </Button>
                </Space>
              )}
            />
          </Table>
        </AntdSpinCustom>
        <RowDrawer ref={rowDrawer} handleChangeUserSuccess={getTableData} />
      </Card>
    </div>
  );
};

export default TableExample;
