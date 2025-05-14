import React from 'react';
import { Card, List, Tag, Space, Divider } from 'antd';
import {
  MessageOutlined,
  EyeOutlined,
  LikeOutlined
} from '@ant-design/icons';

const { Meta } = Card;

const PostList = () => {
  const data = [
    {
      id: '1',
      type: '帖子',
      title: '房屋租赁合同纠纷，房东无故强迫退租如何处理？',
      content: '我目前的房屋合同期限未满，房东突然要求上调租金 50%，否则要求我搬离。我该如何维护自己的权益？',
      date: '2024-01-15',
      views: 238,
      likes: 20,
      comments: 12
    },
    {
      id: '2',
      type: '文章',
      title: '【法律科普】知识产权保护实用指南',
      content: '随着互联网技术的发展，知识产权保护变得越来越重要。本文为大家详细解读知识产权保护的相关法律知识和实用技巧,这下面一段使用来测试超出隐藏效果的',
      date: '2024-01-14',
      views: 156,
      likes: 18,
      comments: 8
    },
    {
      id: '3',
      type: '帖子',
      title: '工作期间受伤，公司不认工伤怎么办？',
      content: '在工作时不小心受伤，但公司表示不是在工作时间内受伤，不予认定工伤。我该如何维护自己的权益？',
      date: '2024-01-13',
      views: 156,
      likes: 18,
      comments: 8
    }
  ];

//   const IconText = ({ icon, text }) => (
//     <Space>
//       {React.createElement(icon)}
//       {text}
//     </Space>
//   );

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <Card 
            style={{ marginBottom: '16px' }}
            hoverable
          >
            <Meta
              title={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Tag style={{width:40,height:24,border:0,padding:'4px,8px'}}color={item.type === '帖子' ? 'blue' : 'green'}>{item.type}</Tag>
                  <h3>{item.title}</h3>
                </div>
              }
              description={
                <>
                  <div 
                  style={{ 
                    margin: '8px 0',
                    color:'#4B5563',
                    fontSize:16,
                    whiteSpace: 'nowrap',   // 关键1：禁止换行
                    overflow: 'hidden',      // 关键2：隐藏溢出
                    textOverflow: 'ellipsis', // 关键3：显示省略号
                    width: '100%',          
                    }}>
                        {item.content}
                    </div>
                  <div 
                  style={{ 
                    width:300,
                    height:32,
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    color:'#6B7280',
                    borderRadius: 12
                    }}>
                    <span>{item.date}</span>
                    <span>浏览 {item.views}</span>
                    <span>点赞 {item.likes}</span>
                    <span>评论 {item.comments}</span>
                    <Space size="middle">
                      {/* <IconText icon={EyeOutlined} text={item.views} />
                      <IconText icon={LikeOutlined} text={item.likes} />
                      <IconText icon={MessageOutlined} text={item.comments} /> */}
                    </Space>
                  </div>
                </>
              }
            />
          </Card>
        )}
      />
    </>
  );
};

export default PostList;