import { memo, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ArrowRightOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import { Input, Card, Button, Space, Upload, message, Modal } from 'antd';
import style from './MarkDown.less';
import { downLoadFileByBlob } from '@/utils/utils';
import { UploadChangeParam } from 'antd/lib/upload';

const messageKey = 'loading';

const MarkDown = () => {
  const [inputValue, setInputValue] = useState('# Hello');
  const [isLoading, setIsLoading] = useState(false);
  const [exportFileStatus, setExportFileStatus] = useState({
    modalVisible: false,
    fileName: '',
  });
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
    return () => {};
  }, []);

  const toggleModalVisible = () => {
    setExportFileStatus({ ...exportFileStatus, modalVisible: !exportFileStatus.modalVisible });
  };

  const handleInputValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputFileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExportFileStatus({ ...exportFileStatus, fileName: e.target.value });
  };

  const handleUploadFile = (e: UploadChangeParam) => {
    const { file } = e;
    setIsLoading(true);
    message.loading({ content: '导入中.....', key: messageKey, duration: 0 });
    if (file.status === 'done') {
      const timer = setTimeout(() => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.file.originFileObj);
        fileReader.onload = ({ target }: { target: any }) => {
          setInputValue(target.result);
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
    downLoadFileByBlob(new Blob([inputValue]), `${fileName}.md`);
    toggleModalVisible();
  };

  return (
    <div className={style.markDown}>
      <Card title="MarkDown编辑">
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
        <div className={style.container}>
          <div className={style.containerLeft}>
            <Input.TextArea
              placeholder="请在此输入MarkDown语法，右侧即可预览"
              autoSize={true}
              value={inputValue}
              onChange={handleInputValue}
              ref={inputRef}
            />
          </div>
          <ArrowRightOutlined style={{ fontSize: '20px' }} />
          <div className={style.containerRight}>
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
          onChange={handleInputFileName}
        />
      </Modal>
    </div>
  );
};

export default memo(MarkDown);
