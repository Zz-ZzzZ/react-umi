import { Card, Form, Input, Button, Switch, Upload } from 'antd';
import style from './form.less';
import { UserOutlined, KeyOutlined, UploadOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const FormExample = () => {
  const [form] = Form.useForm();

  const handleClickFillForm = () => {};

  const handleClickFinishForm = (values) => {
    console.log(values);
  };

  const getFile = (e) => (Array.isArray(e) ? e : e && e.fileList);

  return (
    <div className={style.form}>
      <h2>Form 表单</h2>
      <div className={style.container}>
        <Card style={{ width: '48%' }} title="表单填写">
          <Form {...formItemLayout} onFinish={handleClickFinishForm}>
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

            <Form.Item label="Switch" name="switch" valuePropName="checked">
              <Switch checkedChildren="on" unCheckedChildren="off" />
            </Form.Item>

            <Form.Item
              label="UploadFile"
              getValueFromEvent={getFile}
              name="upload"
              valuePropName="fileList"
            >
              <Upload>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
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
        </Card>
        <Card style={{ width: '48%' }} title="表单预览"></Card>
      </div>
    </div>
  );
};

export default FormExample;
