"use client"
import { Avatar, List, Menu} from "antd"
import MainLayout from "@/components/layout/MainLayout"
import React, { useState } from 'react';
import styles from './page.module.css';
import { useRouter } from "next/navigation";
import MainHeader from "@/components/header/MainHeader";
import PostList from "@/components/postlist/PostList";

const tablist = [
  { key: 'all', label: '全部' },
  { key: 'hot', label: '热门' },
  { key: 'legal', label: '法律咨询' },
  { key: 'labor', label: '劳动法' },
  { key: 'marriage', label: '婚姻家事' },
  { key: 'contract', label: '合同纠纷' },
  { key: 'property', label: '房产纠纷' },
];
//测试数据
const layerlist = [
  {
    name: '李明',
    description:'婚姻家事专家'
  },
  {
    name: '王芳',
    description:'劳动法专家'
  },
  {
    name: '张伟',
    description:'知识产权专家'
  },
  
];
export default function Home() {
  const [current, setCurrent] = useState('mail');
  const  router = useRouter();
  const [selectedKey, setSelectedKey] = useState('all')
  return (
    <MainLayout>
      <div className={styles.homePage}>
        <MainHeader/>
        <div 
        style={{ 
          width:1248,
          display: 'flex', 
          gap: 8, 
          marginLeft:96,
          marginTop:32}}>
          <Menu
            mode="horizontal"
            items={tablist.map(item => ({
              ...item,
              style: {
                borderRadius:4,
                marginRight:10,
                lineHeight: '40px', 
                padding:'8px,16px',
                background: selectedKey === item.key ? '#B04068' : '#F3F4F6',
                color: selectedKey === item.key ? 'white' : '#4B5563',
              },
            }))}
            selectedKeys={[selectedKey]}
            onClick={(e) => setSelectedKey(e.key)}
            style={{background:'transparent',borderBottom:'none'}}
            className={styles.tablistItem}
          />
        </div>
        <div className={styles.main}>
          <div style={{width: 896, zIndex: 0}}>
            <PostList/>
          </div>
          <aside style={{width: 320, height: 620, zIndex: 1,}}>
            <div style={{width: 320,  padding: 24,backgroundColor:'white',borderRadius: 12}}>
              <h3>律师推荐</h3>
              <List
                itemLayout="horizontal"
                dataSource={layerlist}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                      title={<a>{item.name}律师</a>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
  
}