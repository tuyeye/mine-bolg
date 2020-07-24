import React, { useEffect, useState, FC } from 'react';
import Layout from '@/pages/layout/_layout';
import NProgress from 'nprogress';
import request from '@/pages/assemblies/request';
import { Result, Spin } from 'antd';
import {
    ArticleItem, PageChange, baseUrl
} from '@/pages/assemblies/basic';
import { LoadingOutlined } from '@ant-design/icons';
import { requestData } from '@/pages/layout/classess';

const page: FC<any> = ({ type, data }) => {

    const [res, setData] = useState({
        data: [],
        loading: true,
        total: 0,
        pageNum: 0,
        pageSize: 5,
        lostConnect: false
    });

    const getData = async (page: number) => {

        let requestParams: requestData = {
            pageNum: page,
            pageSize: res.pageSize
        };

        if (type === 'classify') requestParams.classify = data.classify;
        if (type === 'search') requestParams.searchKey = data.searchKey ? data.searchKey : '';

        setData({ ...res, loading: true, lostConnect: false });
        const response = await request(`${baseUrl}/bloglist`, {
            params: requestParams,
            timeout: 1000
        });
        if (response) {
            setData({
                ...res,
                data: response.data,
                total: response.total,
                loading: false,
                pageNum: page
            });
        }
        else {
            setData({
                ...res,
                loading: false,
                lostConnect: true
            })
        }
        NProgress.done();
    }

    const changePage = (page: number) => {
        getData(page);
    }

    useEffect(() => {
        getData(0);
    }, [])

    return (
        <Spin tip='LOADING ...' spinning={res.loading} indicator={<LoadingOutlined style={{ fontSize: 20 }} spin />}>
            <Layout lostConnect={res.lostConnect}>
                {
                    res.data.length == 0 && (!res.loading) && (
                        <Result
                            status="404"
                            title="文章不存在"
                            subTitle="抱歉，没有找到相关文章。去其他栏目看看吧～"
                        />
                    )
                }
                {
                    res.data.length > 0 && (!res.loading) && (
                        <>
                            {res.data.map((item: any, index: number) => (
                                <ArticleItem item={item} key={index} />
                            ))}
                            <PageChange pageNum={res.pageNum} total={res.total} pageSize={res.pageSize} changeFunction={changePage} />
                        </>
                    )
                }
            </Layout>
        </Spin>
    );
}

export default page;