import { memo, useState } from 'react';
import { Switch, Button, message } from 'antd';
import Card from '@/base/card/Card';
import { Cropper } from 'react-cropper';
import imageExample from '@/assets/logo.png';
import 'cropperjs/dist/cropper.css';
import style from './ImageCrop.less';
import { downLoadFileByFetch } from '@/utils/utils';

const ImageCrop = () => {
  // true => 矩形
  const [displayMode, setDisplayMode] = useState(true);
  const [cropInstance, setCropInstance] = useState<any>(null);
  const [cropLoading, setCropLoading] = useState(false);

  const handleCroppingImage = () => {
    if (cropInstance) {
      setCropLoading(true);
      const timer = setTimeout(() => {
        let imgUrl = null;
        const croppedCanvas = cropInstance.getCroppedCanvas();
        const outPutFileType = 'image/png';
        if (displayMode) {
          imgUrl = croppedCanvas.toDataURL(outPutFileType);
        } else {
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
            imgUrl = canvas.toDataURL(outPutFileType);
          }
        }
        downLoadFileByFetch(imgUrl, 'crop.png');
        message.success('裁剪完成');
        setCropLoading(false);
      }, 1000);
    }
  };

  return (
    <div className={`container ${style.imageCrop}`}>
      <Card cardClassName="padding-large">
        <div className={style.cropSwitch}>
          <Switch
            checkedChildren="矩形"
            unCheckedChildren="圆形"
            defaultChecked
            onChange={(e) => setDisplayMode(e)}
          />
        </div>
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
            <Card>
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
          <Button type="primary" onClick={handleCroppingImage} loading={cropLoading}>
            裁剪并下载
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default memo(ImageCrop);
