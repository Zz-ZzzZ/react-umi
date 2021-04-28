import { Card, Button, Tag } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import style from './TodoList.less';
import { memo } from 'react';

const TodoList = memo(({ toDoList, handleClickPassItem, handleClickSuccessItem }) => {
  return (
    <Card title="ToDoList" size="small" style={{ height: '100%' }}>
      {toDoList.map((item, index) => (
        <div key={item.id} className={style.listItem}>
          <div className={style.listItemNo}>{index + 1}.</div>
          <div
            className={`${style.listItemJob} ${item.isSuccess ? style.listItemJobSuccess : null}`}
          >
            {item.job}
          </div>
          {!item.isSuccess ? (
            <>
              <Button size="small" type="primary" onClick={() => handleClickSuccessItem(item.id)}>
                Success
              </Button>
              <Button size="small" onClick={() => handleClickPassItem(item.id)}>
                Pass
              </Button>
            </>
          ) : (
            <Tag color="#55acee">
              <LikeOutlined style={{ marginRight: '3px' }} />
              good
            </Tag>
          )}
        </div>
      ))}
    </Card>
  );
});

export default TodoList;
