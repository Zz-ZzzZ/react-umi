import { FC, HTMLAttributes, memo } from 'react';
import style from './Card.less';

export interface ICardProps {
  // 自定义className
  cardClassName?: HTMLAttributes<string> | string;
  // 内容是否水平垂直居中
  contentCenter?: boolean;
}

const Card: FC<ICardProps> = memo(({ children, cardClassName = '', contentCenter = false }) => {
  return (
    <div className={`${style.card} ${contentCenter ? style.cardCenter : ''} ${cardClassName} `}>
      {children}
    </div>
  );
});

export default Card;
