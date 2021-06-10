import { memo } from 'react';
import { Card } from 'antd';
import { Cropper } from 'react-cropper';
import imageExample from '@/assets/logo.png';
import 'cropperjs/dist/cropper.css';
import style from './ImageCropping.less';

const ImageCropping = () => {
  return (
    <div className={style.imageCropping}>
      <Card title="图片裁剪"></Card>
    </div>
  );
};

export default memo(ImageCropping);
