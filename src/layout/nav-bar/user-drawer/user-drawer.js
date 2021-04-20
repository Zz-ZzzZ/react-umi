import { Drawer, Form, Input, Cascader, Button, message } from 'antd';
import { useState, forwardRef, useImperativeHandle, useEffect, memo } from 'react';
import axios from 'axios';
import AntdSpinCustom from '@/base/spin/spin';

const options = [
  {
    value: '浙江省',
    label: '浙江省',
    children: [
      {
        value: '杭州市',
        label: '杭州市',
        children: [
          {
            value: '上城区',
            label: '上城区',
          },
        ],
      },
      {
        value: '嘉兴市',
        label: '嘉兴市',
        children: [
          {
            value: '南湖区',
            label: '南湖区',
          },
        ],
      },
    ],
  },
];

const UserDrawer = forwardRef(({ userInfo, handleChangeUserSuccess }, ref) => {
  const [isShowDrawer, setIsShowDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    showDrawer: () => setIsShowDrawer(true),
  }));

  useEffect(() => {
    form.setFieldsValue(userInfo);
    return () => {};
  }, [userInfo]);

  const handleFormSubmit = async (value) => {
    setLoading(true);
    const { data } = await axios.post('/api/setUser', value);
    if (data.result) {
      message.success('修改成功');
      setIsShowDrawer(false);
      handleChangeUserSuccess();
    }
    setLoading(false);
  };

  return (
    <Drawer
      title="修改信息"
      placement="right"
      visible={isShowDrawer}
      closable={false}
      width={384}
      onClose={() => setIsShowDrawer(false)}
      getContainer={false}
    >
      <AntdSpinCustom spinning={loading} tip="提交中...">
        <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '名称是必填项！' }]}
          >
            <Input placeholder="名称" />
          </Form.Item>

          <Form.Item name="tel" label="联系方式">
            <Input placeholder="联系方式" />
          </Form.Item>

          <Form.Item name="address" label="地址">
            <Cascader options={options} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            修改
          </Button>
        </Form>
      </AntdSpinCustom>
    </Drawer>
  );
});

export default UserDrawer;
