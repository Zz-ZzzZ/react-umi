import React from 'react';
import style from './Person.less';
import userAvatar from '../../../public/favicon.ico';
import { Card, Form, Input, Button, Tabs, Cascader } from 'antd';
import { connect } from 'umi';
import { IUser } from '@/models/user';
import { useEffect } from 'react';
import options from './options';

interface IPerson {
  userInfo: IUser;
}

const { TabPane } = Tabs;

const Person = ({ state }: { state: IPerson }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ ...state.userInfo });
    return () => {};
  }, []);

  return (
    <div className={style.person}>
      <Card size="small" title="个人设置">
        <Tabs tabPosition="left">
          <TabPane tab="基本设置" key="1">
            <div className={style.personContainer}>
              <div className={style.containerLeft}>
                <h2>基本设置</h2>
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
            </div>
          </TabPane>
          <TabPane tab="安全设置" key="2"></TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default connect((state: IPerson) => ({ state }))(Person);
