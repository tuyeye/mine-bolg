import React, { useEffect } from 'react';
import Layout from '@/pages/layout/_layout';
import { Result } from 'antd';
import NProgress from 'nprogress';

export default () => {

    useEffect(() => {
        NProgress.done();
    }, []);
    
    return (
        <Layout>
            <Result
                status='404'
                title="页面被外星人抓走了"
                extra='看看其他页面吧～'
            />
        </Layout>
    )
}