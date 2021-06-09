import React, { useState, useImperativeHandle, useEffect, forwardRef, Ref, memo, FC } from 'react';
import { Button, Form, Input } from 'antd';

let timer: NodeJS.Timeout | null = null;
const CODE_TEXT = '获取验证码';
const PhoneCodeButton = () => {
  const [count, setCount] = useState<string | number>(CODE_TEXT);

  useEffect(() => {
    if (count === 60) {
      timer = setInterval(() => {
        setCount((count) => (count as number) - 1);
      }, 1000);
    } else if (count === 0 && timer) {
      clearInterval(timer);
      setCount(CODE_TEXT);
    }
    return () => {};
  }, [count]);

  const handleGetCode = () => {
    if (typeof count !== 'number') {
      setCount(60);
    }
  };

  return (
    <Button type="primary" onClick={handleGetCode} style={{ width: '150px' }}>
      {count !== CODE_TEXT ? `${count}s` : count}
    </Button>
  );
};

export interface IModalContentRef {
  getFormValue: Function;
  clearFormValue: Function;
}

interface IModalContentProp {
  modalTitle: string;
  ref: Ref<IModalContentRef>;
}

const ModalContent: FC<IModalContentProp> = forwardRef(({ modalTitle }, ref) => {
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
              <PhoneCodeButton />
            </div>
          </Form.Item>
          <Form.Item name="code" label="验证码">
            <Input placeholder="输入验证码" />
          </Form.Item>
        </>
      )}
    </Form>
  );
});

export default memo(ModalContent);
