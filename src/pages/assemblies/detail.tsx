import React, { FC, useState, useEffect } from 'react';
import Layout from '@/pages/layout/_layout';
import {
    DashedBody, Title, Body, BreadInfo, RenderData, NoDashedBody,
    CommentSubmit, baseUrl
} from '@/pages/assemblies/basic';
import { Skeleton } from 'antd';
import NProgress from 'nprogress';
import { useParams } from "umi";
import request from '@/pages/assemblies/request';


const page: FC = () => {

    const params: any = useParams();

    const [res, setData] = useState<any>(
        {
            loading: true,
            data: {},
            notFound: false,
            lostConnect: false
        }
    );

    const getData = async () => {
        const response = await request(`${baseUrl}/blogdetail`, {
            params: { id: params.id }
        });
        //console.log(response)
        if (!response) setData({ ...res, lostConnect: true });
        else if (response.code === -1) setData({ ...res, notFound: true });
        else setData({ ...res, loading: false, data: response.data });
        NProgress.done();
    }


    useEffect(() => {
        getData();
    }, []);

    return (
        <Layout notFound={res.notFound} lostConnect={res.commentCount}>
            <DashedBody>
                <Skeleton loading={res.loading} active>
                    {
                        res.data.breadInfo && (
                            <>
                                <Title str={res.data.title} href='javascript:;' />
                                <BreadInfo name={res.data.breadInfo.name} date={res.data.breadInfo.date} cate={JSON.parse(res.data.breadInfo.cate)} commentCount={res.data.breadInfo.commentCount} />
                                <RenderData data={JSON.parse(res.data.datas)} />
                                <Body str={res.data.body} />
                            </>
                        )
                    }
                </Skeleton>
            </DashedBody>
            <NoDashedBody>
                <Skeleton loading={res.loading}>
                    {
                        res.data.breadInfo && (<CommentSubmit discomment={res.data.discomment} />)
                    }
                </Skeleton>
            </NoDashedBody>
        </Layout>
    )
}

export default page;