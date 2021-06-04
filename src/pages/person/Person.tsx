import React from 'react';
import style from './Person.less';
import { Card, Form } from 'antd';

const Person = () => {
  const [form] = Form.useForm();

  return (
    <div className={style.person}>
      <Card size="small" title="个人设置">
        <Form form={form}>
          <Form.Item></Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Person;
