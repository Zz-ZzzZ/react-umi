import { Button, Cascader, Form, FormInstance, Input } from 'antd';
import style from '@/pages/person/Person.less';
import options from '@/pages/person/basic/options';
import React, { memo } from 'react';

const Basic = ({ form }: { form: FormInstance }) => {
  return (
    <div className={style.basicBlock}>
      <Form form={form} layout="vertical">
        <Form.Item name="username" label="Username">
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="tel" label="Tel">
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Cascader options={options} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary" block={true}>
            更改信息
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(Basic);
