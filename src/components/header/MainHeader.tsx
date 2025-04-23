"use client"
import { Avatar, Button, Dropdown, Input, List, Menu, MenuProps, message, Typography } from "antd"
import React, { useState } from 'react';
import styles from './MainHeader.module.css';
import Image from 'next/image'
import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { logout } from '@/api/auth';

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    label: '首页',
    key: 'index',
  },
  {
    label: '关注',
    key: 'focus',
  },
  {
    label: '消息',
    key: 'message',
  },
]
const useritems: MenuProps['items'] = [
  {
    label: '个人中心',
    key: '0',
  },
  {
    label: '账号设置',
    key: '1',
  },
  {
    label: '退出登录',
    key: '2',
    onClick: async () => {
      await logout(); // 调用退出API
      useAuth().logout(); // 更新全局登录状态
      message.success('已退出登录');
    }
  }
];


export default function MainHeader() {
  const [current, setCurrent] = useState('mail');
  const  router = useRouter();
  // const [selectedKey, setSelectedKey] = useState('all')
  const { isAuthenticated, user } = useAuth();
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <header className={styles.header}> 
      <Image
          src="/auth/logo_LAW.svg"  
          alt="LAW-Logo"
          width={230} 
          height={80} 
          className={styles.logo}
      />
      <Input 
        size="large"
        placeholder="搜索法律问题、文章或律师"
        prefix={<SearchOutlined />} 
        style={{marginLeft:-60,borderRadius: 4,width:532,fontSize:14}}
      />
      <Button 
        type="primary" 
        autoInsertSpace 
        //className={styles.headerButton}>
        style={{marginLeft:38,borderRadius: 4,width:74,height:38}}
      >
        发布
      </Button>
      <span className={styles.headerList}>
        <Menu  
          onClick={handleMenuClick} 
          selectedKeys={[current]} 
          mode="horizontal" 
          items={items} 
          style={{width:200,height:64,alignItems: 'center',letterSpacing:2}}
        />
        {isAuthenticated ? (
          <Dropdown menu={{ items:useritems }}>
          <a onClick={(e) => e.preventDefault()}>
            <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=1`} />
          </a>
        </Dropdown>
        ) : (
          <Button 
            type="primary" 
            autoInsertSpace 
            //className={styles.headerButton}>
            style={{marginLeft:38,borderRadius: 4,width:100,height:38}}
            onClick={() => router.push('/login')}  
          > 
          登录/注册
          </Button>
          )}
      </span>
    </header>
    
  );
  
}