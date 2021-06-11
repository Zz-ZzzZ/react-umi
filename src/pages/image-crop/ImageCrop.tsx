import { memo, useState } from 'react';
import { Card, Switch, Button } from 'antd';
import { Cropper } from 'react-cropper';
import imageExample from '@/assets/logo.png';
import 'cropperjs/dist/cropper.css';
import style from './ImageCrop.less';

const ImageCrop = () => {
  // true => 矩形
  const [displayMode, setDisplayMode] = useState(true);
  const [cropInstance, setCropInstance] = useState<any>(null);
  const [cropData, setCropData] = useState('');

  const handleToggleMode = (e: boolean) => {
    setDisplayMode(e);
  };

  const handleCroppingImage = () => {
    if (cropInstance) {
      const croppedCanvas = cropInstance.getCroppedCanvas();
      const outPutFileType = 'image/png';
      if (displayMode) return setCropData(croppedCanvas.toDataURL(outPutFileType));
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const width = croppedCanvas.width;
      const height = croppedCanvas.height;
      canvas.width = width;
      canvas.height = height;
      if (context) {
        context.drawImage(croppedCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI);
        context.fill();
        return setCropData(canvas.toDataURL(outPutFileType));
      }
    }
  };

  return (
    <div className={`container ${style.imageCrop}`}>
      <Card
        title="图片裁剪"
        extra={
          <Switch
            checkedChildren="矩形"
            unCheckedChildren="圆形"
            defaultChecked
            onChange={handleToggleMode}
          />
        }
      >
        <div className={style.cropContainer}>
          <div className={`${style.cropContainerLeft} ${!displayMode && style.circularMode}`}>
            <Cropper
              src={imageExample}
              cropBoxMovable={displayMode}
              cropBoxResizable={displayMode}
              style={{ width: '100%', height: '100%' }}
              preview=".img-preview"
              onInitialized={(instance) => setCropInstance(instance)}
            />
          </div>
          <div className={style.cropContainerRight}>
            <Card title="裁剪预览" size="small">
              <div
                className={`img-preview ${style.displayBlock} ${
                  displayMode ? style.rectMode : style.circularMode
                }`}
                style={{ width: '100%', height: '100%', overflow: 'hidden' }}
              />
            </Card>
          </div>
        </div>
        <div className={style.cropBtn}>
          <Button type="primary" onClick={handleCroppingImage}>
            裁剪
          </Button>
        </div>
        <img src={cropData} style={{ width: '200px', height: '200px' }} />
      </Card>
    </div>
  );
};

export default memo(ImageCrop);
