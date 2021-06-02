import { Button, Drawer, Form, Input, message } from 'antd';
import React, { FC, forwardRef, useImperativeHandle, useState, memo, Ref } from 'react';
import axios from 'axios';

export interface IRowDrawerRef {
  showRowDrawer: (record: { id: number; name: string; email?: string; city?: string }) => void;
}

interface IRowDrawer {
  handleChangeUserSuccess: Function;
  ref: Ref<IRowDrawerRef>;
}
const RowDrawer: FC<IRowDrawer> = forwardRef(({ handleChangeUserSuccess }, ref) => {
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

  const handleFormSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
