import { Form, Input, Button, Checkbox, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { MouseEvent, useState, useEffect } from 'react';
import { connect, history, Dispatch } from 'umi';
import style from './Login.less';
import logo from '@/assets/logo.png';
import { login } from '@/api/user';
import AntdSpinCustom from '@/base/spin/Spin';
import { ConnectState } from '@/models/connect';
import { ILogin } from '@/models/user';

const getRememberStatus = () => JSON.parse(sessionStorage.getItem('userInfo') as string);

const Login = ({ state, dispatch }: { state: ConnectState; dispatch: Dispatch }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const {
    userInfo: { username, password, remember },
  } = state;

  useEffect(() => {
    // 获取保存账号密码状态
    const status = getRememberStatus();
    if (status && username && password && remember) {
      form.setFieldsValue({ username, password });
    }
    return () => {};
  }, []);

  // 忘记密码时填充信息到表单
  const handleClickForgot = (e: MouseEvent) => {
    e.preventDefault();
    form.setFieldsValue({ username: 'admin', password: 'admin' });
  };

  const handleSubmitForm = async ({ username, password, remember }: ILogin) => {
    setLoading(true);
    const { data } = await login(username, password);
    if (data.status) {
      message.success(data.message);
      dispatch({ type: 'userInfo/login', payload: { username, password, remember } });
      // 保存此次登录时是否需要保存账号信息
      history.replace('/');
    } else {
      message.error(data.message);
    }
    setLoading(false);
  };

  return (
    <AntdSpinCustom spinning={loading} tip="登录中...">
      <div className={style.login}>
        <div className={style.loginBg} />
        <div className={style.loginTitle}>
          <img src={logo} alt="" className={style.loginTitleIcon} />
        </div>
        <div className={style.loginForm}>
          <Form
            layout="vertical"
            initialValues={{ remember: true }}
            form={form}
            onFinish={handleSubmitForm}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input you username' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="手动输入admin或点击忘记密码" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input you password' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="手动输入admin或点击忘记密码" />
            </Form.Item>
            <Form.Item>
              <div className={style.loginFormForgot}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember Me</Checkbox>
                </Form.Item>

                <a href="" onClick={(e) => handleClickForgot(e)}>
                  Forgot password ?
                </a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </AntdSpinCustom>
  );
};

export default connect((state: ConnectState) => ({ state }))(Login);
