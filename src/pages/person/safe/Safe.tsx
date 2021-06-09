import style from '@/pages/person/Person.less';
import React, { memo, useState, useRef } from 'react';
import { Modal } from 'antd';
import ModalContent, { IModalContentRef } from '@/pages/person/safe/ModalContent';

const Safe = () => {
  const [title, setTitle] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalContentRef = useRef<IModalContentRef>(null);

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
