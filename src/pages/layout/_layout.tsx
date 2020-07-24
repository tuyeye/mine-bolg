import React, { FC } from 'react';
import { useLocation, useParams } from 'umi';
import { BackTop, Avatar, Space, Menu, Input, Result, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './layout.css';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css'

const Nav: FC<{}> = () => {

    const params: any = useParams();
    const location = useLocation();

    const search = (e: any) => {
        const { target: { value } } = e;
        if (value) window.location.href = `/search/${value}`;
        else message.warning('搜索关键词不可以为空～');
    }

    return (
        <div className='layout-top'>
            <div className='main'>
                <Space>
                    <Avatar shape="square" size={37} src='https://gw.alipayobjects.com/mdn/afts/img/A*tF_ZT5B56RUAAAAAAAAAAABjARQnAQ/original?bz=rms' />
                    <p>share 공유 하 다.</p>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]} className='menu'>
                        <Menu.Item key="/">
                            <a href='/'>首页</a>
                        </Menu.Item>
                        <Menu.Item key="/live">
                            <a href='/live'>生活</a>
                        </Menu.Item>
                        <Menu.Item key="/skill">
                            <a href='/skill'>技术</a>
                        </Menu.Item>
                    </Menu>
                </Space>

                <div className='search'>
                    <Input
                        className='input'
                        placeholder='按回车以搜索内容'
                        suffix={<SearchOutlined />}
                        defaultValue={params.searchKey ? params.searchKey : null}
                        onPressEnter={search}
                    />
                </div>
            </div>
        </div>
    )
}

const layout: FC<any> = ({ children, lostConnect, notFound }) => {
    return (
        <>
            <Nav />
            <div className='blog-body'>
                {
                    lostConnect && (
                        <Result
                            status="warning"
                            title="与服务器失去连接"
                            extra='这可能是网络因素导致的，也可能是服务维护导致的'
                        />
                    )
                }
                {
                    notFound && (
                        <Result
                            status='404'
                            title="文章已删除"
                            extra='文章被博主删除了，看看其他文章吧～'
                        />
                    )
                }
                {
                    !lostConnect && !notFound && children
                }
            </div>
            <div className='footer'>
                ©{(new Date()).getFullYear()} TWOYECLOUD.COM
                </div>
            <BackTop />
        </>
    )
}

export default layout;