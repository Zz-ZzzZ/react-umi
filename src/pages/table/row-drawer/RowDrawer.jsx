import { Drawer, Form } from 'antd';

const RowDrawer = ({ row }) => {
  const form = Form.useForm();

  return (
    <Drawer>
      <Form></Form>
    </Drawer>
  );
};

export default RowDrawer;
