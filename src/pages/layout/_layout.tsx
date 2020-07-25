import React, { FC } from 'react';
import { BackTop, Result } from 'antd';
import { configResponsive, useResponsive } from 'ahooks';
import { Nav } from '@/pages/assemblies/Components';
import './layout.css';
import 'braft-editor/dist/index.css';
import 'braft-editor/dist/output.css'

configResponsive({
    small: 0,
    middle: 960,
    large: 1200,
});

const layout: FC<any> = ({ children, lostConnect, notFound }) => {

    const { small, middle, large } = useResponsive();

    const isSmall = small && !middle && !large;

    const body = <>
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
    </>;

    return (
        <>
            <Nav isSmall={isSmall} />
            <div className={isSmall ? 'blog-small-body' : 'blog-body'}>
                {body}
            </div>
            <div className='footer'>
                ©{(new Date()).getFullYear()} 浙ICP备18036473号
            </div>
            <BackTop />
        </>
    )
}

export default layout;