import React, { useEffect, FC } from 'react';
import Layout from '@/pages/layout/_layout';
import { connect } from 'dva';
import { Result, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import NProgress from 'nprogress';
import {
    ArticleItem, PageChange
} from '@/pages/assemblies/basic';
import { requestParams } from './data.t';
import { useResponsive } from 'ahooks';

const namespace = 'blogList';

const page: FC<any> = ({ blogList, dispatch, data, type }) => {

    const { small, middle, large } = useResponsive();
    const isSmall = small && !middle && !large;
    
    const getData = async (page: number) => {

        let payload: requestParams = {
            pageNum: page,
            pageSize: blogList.pageSize
        };

        if (type === 'classify') payload.classify = data.classify;
        if (type === 'search') payload.searchKey = data.searchKey ? data.searchKey : '';

        await dispatch({ type: `${namespace}/fetch`, payload });

        NProgress.done();

    }

    const changePage = (page: number) => {
        getData(page);
    }

    useEffect(() => {
        getData(0);
    }, [])

    return (
        <Spin tip='LOADING ...' spinning={blogList.loading} indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />}>
            <Layout lostConnect={blogList.lostConnect}>
                {
                    blogList.data.length == 0 && (!blogList.loading) && (
                        <Result
                            status="404"
                            title="文章不存在"
                            subTitle="抱歉，没有找到相关文章。去其他栏目看看吧～"
                        />
                    )
                }
                {
                    blogList.data.length > 0 && (!blogList.loading) && (
                        <>
                            {blogList.data.map((item: any, index: number) => (
                                <ArticleItem item={item} key={index} isSmall={isSmall} />
                            ))}
                            <PageChange pageNum={blogList.pageNum} total={blogList.total} pageSize={blogList.pageSize} changeFunction={changePage} />
                        </>
                    )
                }
            </Layout>
        </Spin>
    );
}

export default connect(({ blogList }: any) => ({ blogList }))(page);