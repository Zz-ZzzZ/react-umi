import { Button, Drawer, Form, Input, message } from 'antd';
import { forwardRef, useImperativeHandle, useState, memo } from 'react';
import axios from 'axios';

const RowDrawer = forwardRef(({ row, handleChangeUserSuccess }, ref) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(0);

  useImperativeHandle(ref, () => ({
    showRowDrawer: (record) => {
      setVisible(true);
      if (Object.keys(record).length > 0) {
        const { id, name, email, city } = record;
        setId(id);
        form.setFieldsValue({ name, email, city });
      }
    },
  }));

  const handleFormSubmit = async (e) => {
    const { data } = await axios.post('/api/updateTableRowById', { ...e, id });
    if (data.result) {
      message.success('修改成功');
      handleChangeUserSuccess();
      setVisible(false);
    }
  };

  return (
    <Drawer visible={visible} onClose={() => setVisible(false)}>
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item label="姓名" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="邮箱" name="email">
          <Input />
        </Form.Item>

        <Form.Item label="城市" name="city">
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          确认
        </Button>
      </Form>
    </Drawer>
  );
});

export default memo(RowDrawer);
