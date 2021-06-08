import style from '@/pages/person/Person.less';
import React, { memo, useState, forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface IModalContent {
  getFormValue: Function;
  clearFormValue: Function;
}

const ModalContent = forwardRef(
  ({ modalTitle }: { modalTitle: string }, ref: Ref<IModalContent>) => {
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
      getFormValue: () => form.getFieldsValue(),
      clearFormValue: () => form.resetFields(),
    }));

    return (
      <Form form={form} layout="vertical">
        {modalTitle === '更改账户密码' ? (
          <>
            <Form.Item name="oldVal" label="旧密码">
              <Input placeholder="输入旧密码" />
            </Form.Item>
            <Form.Item name="newVal" label="新密码">
              <Input placeholder="输入新密码" />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item name="phone" label="手机号">
              <div style={{ display: 'flex' }}>
                <Input placeholder="输入手机号" />
                <Button type="primary">获取验证码</Button>
              </div>
            </Form.Item>
            <Form.Item name="code" label="验证码">
              <Input placeholder="输入验证码" />
            </Form.Item>
          </>
        )}
      </Form>
    );
  },
);

const Safe = () => {
  const [title, setTitle] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalContentRef = useRef<IModalContent>(null);

  const handleChangeModalType = (title: string) => {
    setIsModalVisible(true);
    setTitle(title);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    if (modalContentRef.current) {
      window.alert(`${title} - ${JSON.stringify(modalContentRef.current.getFormValue())}`);
      modalContentRef.current.clearFormValue();
    }
  };

  return (
    <>
      <div className={style.betweenItem}>
        <div>
          <h4>账户密码</h4>
          <div className={style.tipColor}>当前密码强度 : 强</div>
        </div>
        <a onClick={() => handleChangeModalType('更改账户密码')}>修改</a>
      </div>
      <div className={style.betweenItem}>
        <div>
          <h4>绑定手机</h4>
          <div className={style.tipColor}>当前绑定手机 : 173****0777</div>
        </div>
        <a onClick={() => handleChangeModalType('更改绑定手机')}>修改</a>
      </div>
      <Modal
        title={title}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleModalOk}
      >
        <ModalContent modalTitle={title} ref={modalContentRef} />
      </Modal>
    </>
  );
};

export default memo(Safe);
