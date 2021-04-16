import { Form, Input, Button } from 'antd';
import style from './login.less';
import logo from '@/assets/logo.png';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login = () => {
  const [form] = Form.useForm();

  const handleClickFillForm = (values) => {
    console.log(values);
  };

  return (
    <div className={style.login}>
      <div className={style.loginTitle}>
        <img src={logo} alt="" className={style.loginTitleIcon} />
      </div>
      <div className={style.loginForm}>
        <Form {...formItemLayout}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input you username' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Input your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input you password' }]}
          >
            <Input.Password prefix={<KeyOutlined />} placeholder="Input your password" />
          </Form.Item>

          <Form.Item {...tailLayout} style={{ marginTop: 10 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
              Submit
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              Reset
            </Button>
            <Button type="link" htmlType="button" onClick={handleClickFillForm}>
              Fill form
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
