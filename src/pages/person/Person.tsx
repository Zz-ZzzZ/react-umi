import React from 'react';
import style from './Person.less';
import userAvatar from '../../../public/favicon.ico';
import { Card, Form, Tabs } from 'antd';
import { connect } from 'umi';
import { IUser } from '@/models/user';
import { useEffect } from 'react';
import Basic from '@/pages/person/basic/Basic';
import Safe from '@/pages/person/safe/Safe';
import Notice from '@/pages/person/notice/Notice';

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
    <div className={`container ${style.person}`}>
      <Card size="small" title="个人设置">
        <Tabs tabPosition="left">
          <TabPane tab="基本设置" key="1">
            <div className={style.tabContent}>
              <h2>基本设置</h2>
              <Basic form={form} />
            </div>
          </TabPane>
          <TabPane tab="安全设置" key="2">
            <div className={style.tabContent}>
              <h2>安全设置</h2>
              <Safe />
            </div>
          </TabPane>
          <TabPane tab="通知设置" key="3">
            <div className={style.tabContent}>
              <h2>通知设置</h2>
              <Notice />
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default connect((state: IPerson) => ({ state }))(Person);
