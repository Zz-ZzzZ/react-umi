import React, { memo, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ArrowRightOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { Input, Card, Button, Space, Upload, message, Modal } from 'antd';
import style from './MarkDown.less';
import { downLoadFile } from '@/utils/utils';
import { UploadChangeParam } from 'antd/lib/upload';
import { TextAreaRef } from 'antd/lib/input/TextArea';
import testMd from '@/pages/mark-down/test-md';

const messageKey = 'loading';
let leftAreaWidth = 0;
let mouseOverArea = '';

const MarkDown = () => {
  const [inputValue, setInputValue] = useState(testMd);
  const [isLoading, setIsLoading] = useState(false);
  const [exportFileStatus, setExportFileStatus] = useState({
    modalVisible: false,
    fileName: '',
  });
  const textAreaRef = useRef<TextAreaRef>(null);
  const markDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textAreaRef.current && textAreaRef.current.resizableTextArea) {
      textAreaRef.current.focus();
      // 获取左侧textArea的宽度
      const target = textAreaRef.current.resizableTextArea.textArea;
      leftAreaWidth = target.offsetWidth;
    }
    return () => {};
  }, []);

  const toggleModalVisible = () => {
    setExportFileStatus({ ...exportFileStatus, modalVisible: !exportFileStatus.modalVisible });
  };

  const handleTextAreaValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement | HTMLTextAreaElement>) => {
    e.persist();
    const target = e.target as HTMLElement;
    // 获取鼠标下落位置 若小于左侧宽度则代表鼠标当前停留在左侧容器内
    mouseOverArea = target.offsetLeft < leftAreaWidth ? 'left' : 'right';
  };

  const handleTextAreaScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.persist();
    if (textAreaRef.current && textAreaRef.current.resizableTextArea && markDownRef.current) {
      const textAreaCurrent = textAreaRef.current.resizableTextArea.textArea;
      const markDownCurrent = markDownRef.current;
      // 获取textArea滑动到底部的最大距离
      const leftScrollTopMax = textAreaCurrent.scrollHeight - textAreaCurrent.clientHeight;
      const rightScrollTopMax = markDownCurrent.scrollHeight - markDownCurrent.clientHeight;
      // 获取左右侧最大距离的比例
      const scrollLeftScale = Number((rightScrollTopMax / leftScrollTopMax).toFixed(3));
      const scrollRightScale = Number((leftScrollTopMax / rightScrollTopMax).toFixed(3));
      // 根据鼠标停留的左/右侧区域来使用不同的滚动比例做滚动跟随
      if (mouseOverArea === 'left') {
        markDownCurrent.scrollTop = textAreaCurrent.scrollTop * scrollLeftScale;
      } else {
        textAreaCurrent.scrollTop = markDownCurrent.scrollTop * scrollRightScale;
      }
    }
  };

  const handleExportFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExportFileStatus({ ...exportFileStatus, fileName: e.target.value });
  };

  const handleUploadFile = (e: UploadChangeParam) => {
    const { file } = e;
    setIsLoading(true);
    message.loading({ content: '导入中.....', key: messageKey, duration: 0 });
    if (file.status === 'done') {
      const timer = setTimeout(() => {
        const fileReader: FileReader = new FileReader();
        fileReader.readAsText(e.file.originFileObj);
        fileReader.onload = ({ target }) => {
          if (target) {
            const result = target.result as string;
            setInputValue(result);
          }
          setIsLoading(false);
          message.success({ content: `${file.name} 导入成功`, key: messageKey, duration: 2 });
          clearTimeout(timer);
        };
      }, 1000);
    }
  };

  const handleExportFile = () => {
    const { fileName } = exportFileStatus;
    if (!fileName) return message.warn('请输入文件名称');
    downLoadFile(new Blob([inputValue]), `${fileName}.md`);
    toggleModalVisible();
  };

  return (
    <div className={`container ${style.markDown}`}>
      <Card title="MarkDown示例">
        <div className={style.actionBar}>
          <Space>
            <Upload accept=".md" onChange={handleUploadFile} showUploadList={false} maxCount={1}>
              <Button type="primary" icon={<UploadOutlined />} loading={isLoading}>
                导入.md文件
              </Button>
            </Upload>
            <Button icon={<DownloadOutlined />} onClick={toggleModalVisible}>
              导出为.md文件
            </Button>
          </Space>
        </div>
        <div className={style.container} onScroll={handleTextAreaScroll}>
          <div className={style.containerLeft}>
            <Input.TextArea
              placeholder="请在此输入MarkDown语法，右侧即可预览"
              autoSize={true}
              value={inputValue}
              onChange={handleTextAreaValue}
              ref={textAreaRef}
              onMouseEnter={handleMouseEnter}
            />
          </div>
          <ArrowRightOutlined style={{ fontSize: '20px' }} />
          <div className={style.containerRight} ref={markDownRef} onMouseEnter={handleMouseEnter}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={inputValue} />
          </div>
        </div>
      </Card>
      <Modal
        title="导出为.md文件"
        visible={exportFileStatus.modalVisible}
        onOk={handleExportFile}
        onCancel={toggleModalVisible}
      >
        <Input
          placeholder="输入导出的.md文件名字"
          value={exportFileStatus.fileName}
          onChange={handleExportFileName}
        />
      </Modal>
    </div>
  );
};

export default memo(MarkDown);
