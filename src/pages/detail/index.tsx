import React, { FC, useEffect } from 'react';
import Layout from '@/pages/layout/_layout';
import { connect } from 'dva';
import {
    DashedBody, Title, Body, BreadInfo, RenderData, NoDashedBody,
    CommentSubmit
} from '@/pages/assemblies/basic';
import { Skeleton } from 'antd';
import NProgress from 'nprogress';
import { useParams } from "umi";


const namesapce = 'blogDetail';
const page: FC = ({ blogDetail, dispatch }:any) => {

    const params: any = useParams();

    const getData = async () => {
        const payload = { id: params.id };
        await dispatch({ type: `${namesapce}/fetch`, payload })
        NProgress.done();
    }


    useEffect(() => {
        getData();
    }, []);

    return (
        <Layout notFound={blogDetail.notFound} lostConnect={blogDetail.lostConnect}>
            <DashedBody>
                <Skeleton loading={blogDetail.loading} active>
                    {
                        blogDetail.data.breadInfo && (
                            <>
                                <Title str={blogDetail.data.title} href='javascript:;' />
                                <BreadInfo name={blogDetail.data.breadInfo.name} date={blogDetail.data.breadInfo.date} cate={JSON.parse(blogDetail.data.breadInfo.cate)} commentCount={blogDetail.data.breadInfo.commentCount} />
                                <RenderData data={JSON.parse(blogDetail.data.datas)} />
                                <Body str={blogDetail.data.body} />
                            </>
                        )
                    }
                </Skeleton>
            </DashedBody>
            <NoDashedBody>
                <Skeleton loading={blogDetail.loading}>
                    {
                        blogDetail.data.breadInfo && (<CommentSubmit discomment={blogDetail.data.discomment} />)
                    }
                </Skeleton>
            </NoDashedBody>
        </Layout>
    )
}

export default connect(({ blogDetail }: any) => ({ blogDetail }))(page);