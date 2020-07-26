import React, { FC, useState, useEffect } from 'react';
import { useLocation, useParams } from 'umi';
import { Avatar, Space, Menu, Input, message, Dropdown } from 'antd';
import { SearchOutlined, AlignCenterOutlined } from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';
import Zmage from 'react-zmage';
import { ImgItemConfig, Img } from '@/pages/layout/classess';
import './styles/datas.css';

//响应式只分大小屏，不分中屏

const { Search } = Input;

//导航栏
const Nav: FC<any> = ({ isSmall }) => {

    const params: any = useParams();
    const location = useLocation();
    const menus = [{ href: '/', lable: '首页' }, { href: '/live', lable: '生活' }, { href: '/skill', lable: '技术' }];

    const search = (e: any) => {

        if (!isSmall) {
            const { target: { value } } = e;
            if (value) window.location.href = `/search/${value}`;
            else message.warning('搜索关键词不可以为空～');
        }
        else {
            if (e) window.location.href = `/search/${e}`;
        }

    }

    const styles: any = { style: isSmall ? { textAlign: 'center' } : null };

    const menuItem = menus.map(item => (
        <Menu.Item key={item.href} {...styles}>
            <a href={item.href}>{item.lable}</a>
        </Menu.Item>
    ))


    return (
        <>
            {!isSmall && (
                <div className='layout-top'>
                    <div className='main'>
                        <Space>
                            <Avatar shape="square" size={37} src='https://gw.alipayobjects.com/mdn/afts/img/A*tF_ZT5B56RUAAAAAAAAAAABjARQnAQ/original?bz=rms' />
                            <p>share 공유 하 다.</p>
                            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[location.pathname]} className='menu'>
                                {menuItem}
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
            )}
            {
                isSmall && (
                    <Dropdown overlay={
                        <Menu style={{ marginTop: '-5px' }}>
                            {menuItem}
                            <Menu.Divider />
                            <Menu.Item key="3" disabled>
                                <Search
                                    placeholder="搜索内容 ..."
                                    onSearch={search}
                                />
                            </Menu.Item>
                        </Menu>
                    }
                        trigger={['click']}
                    >
                        <div className='layout-top' style={{ paddingLeft: '10px', paddingRight: '10px' }}>
                            <div style={{ width: '100%', position: 'relative' }}>
                                <Space size={0}>
                                    <Avatar shape="square" size={37} src='https://gw.alipayobjects.com/mdn/afts/img/A*tF_ZT5B56RUAAAAAAAAAAABjARQnAQ/original?bz=rms' />
                                    <p style={{ fontSize: '17px' }}>share 공유 하 다.</p>
                                </Space>

                                <div style={{ fontSize: '25px', position: 'absolute', right: '0', top: '0' }}>
                                    <AlignCenterOutlined />
                                </div>
                            </div>
                        </div>
                    </Dropdown>
                )
            }
        </>
    )
}

//渲染 datas-------
const RenderImg: FC<any> = ({ data, isList, isSmall }) => {

    const [config, setConfig] = useState<ImgItemConfig>({
        list: [],
        width: '25%'
    });

    useEffect(() => {

        let showList = data.urls;

        if (isList) showList = showList.slice(0, 4);

        if (isList && isSmall) showList = showList.slice(0, 1);

        let length = showList.length > 4 ? 4 : showList.length;

        if (isSmall) length = 1;

        let theData: any[] = [];
        showList.forEach((url: string) => {
            theData.push({
                src: url,
                alt: ''
            })
        });

        setConfig({
            list: theData,
            width: `${100 / length}%`
        });

    }, [isSmall]);


    return (
        <QueueAnim
            component="ul"
            style={{ listStyle: 'none', overflow: 'hidden', paddingLeft: '0px', width: '100%', margin: '0 auto' }}
            duration={1500}
        >
            {
                (config.list).map((item: Img, index: number) => (
                    <li key={index} style={{ float: 'left', width: config.width, textAlign: 'center', padding: '10px' }}>
                        <div onClick={() => {
                            Zmage.browsing({
                                set: config.list,
                                defaultPage: index,
                            })
                        }}>
                            <img src={item.src} className='Image-item' style={{ height: config.list.length <= 2 ? '300px' : '200px' }} />
                        </div>
                    </li>
                ))
            }
        </QueueAnim>
    )
}

const RenderDatas: FC<any> = ({ data, isList, isSmall }: any) => {

    return (
        <div style={{ margin: '20px 0' }}>

            {data.type === 'image' && (<RenderImg data={data} isList={isList} isSmall={isSmall} />)}

            {data.type === 'video' && (
                <QueueAnim
                    duration={1500}
                    type='bottom'
                >
                    {
                        (data.urls).map((item: string, index: number) => (
                            <video src={item} controls key={index} style={{ width: '100%' }}>
                                您的浏览器不支持 video 标签。
                            </video>
                        ))
                    }
                </QueueAnim>
            )}

            {data.type === 'music' && (
                <QueueAnim
                    duration={1500}
                    type='bottom'
                >
                    {
                        (data.urls).map((item: string, index: number) => (
                            <audio src={item} key={index} controls style={{ width: '100%' }}>
                                您的浏览器不支持 audio 标签。
                            </audio>
                        ))
                    }
                </QueueAnim>
            )}
        </div>
    )
}
//渲染 datas--------


//通用边框
const BodyDiv: FC<any> = ({ children, needDashed, isSmall }) => {

    let show = { padding: '50px 0', width: '85%' };
    // if (small && middle && !large) show = { padding: '50px 0', width: '70%' };
    if (isSmall) show = { padding: '25px 0', width: '85%' };

    const lastBorder = {
        style: needDashed ? {
            borderBottom: '1px dashed #ddd', padding: show.padding
        } : { padding: show.padding }
    }

    return (
        <>
            <div {...lastBorder}>
                <div style={{ width: show.width, margin: '0 auto', position: 'relative' }}>
                    {children}
                </div>
            </div>
        </>
    )
}


export { Nav, RenderDatas, BodyDiv }