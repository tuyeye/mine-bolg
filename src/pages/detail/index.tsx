import React, { FC, useEffect } from 'react';
import Layout from '@/pages/layout/_layout';
import { connect } from 'dva';
import {
    Title, Body, BreadInfo
} from '@/pages/assemblies/basic';
import { RenderDatas, BodyDiv } from '@/pages/assemblies/Components';
import CommentSubmit from '@/pages/comment/index';
import { Skeleton } from 'antd';
import NProgress from 'nprogress';
import { useParams } from "umi";
import { useResponsive } from 'ahooks';

const namesapce = 'blogDetail';
const page: FC = ({ blogDetail, dispatch }: any) => {

    const params: any = useParams();

    const { small, middle, large } = useResponsive();
    const isSmall = small && !middle && !large;

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
            <BodyDiv needDashed isSmall={isSmall}>
                <Skeleton loading={blogDetail.loading} active>
                    {
                        blogDetail.data.breadInfo && (
                            <>
                                <Title str={blogDetail.data.title} href='javascript:;' />
                                <BreadInfo name={blogDetail.data.breadInfo.name} date={blogDetail.data.breadInfo.date} cate={JSON.parse(blogDetail.data.breadInfo.cate)} commentCount={blogDetail.data.breadInfo.commentCount} />
                                <RenderDatas data={JSON.parse(blogDetail.data.datas)} isSmall={isSmall}/>
                                <Body str={blogDetail.data.body} />
                            </>
                        )
                    }
                </Skeleton>
            </BodyDiv>
            <BodyDiv>
                <Skeleton loading={blogDetail.loading}>
                    {
                        blogDetail.data.breadInfo && (<CommentSubmit discomment={blogDetail.data.discomment} isSmall={isSmall}/>)
                    }
                </Skeleton>
            </BodyDiv>
        </Layout>
    )
}

export default connect(({ blogDetail }: any) => ({ blogDetail }))(page);