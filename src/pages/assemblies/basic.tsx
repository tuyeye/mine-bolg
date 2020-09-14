import React, { FC } from 'react';
import moment from 'moment';
import {
    Typography, Breadcrumb, Pagination,
} from 'antd';
import { RenderDatas, BodyDiv } from './Components';
import './styles/blogItem.css';

const { Paragraph } = Typography;


//请求头
const baseUrl = process.env.NODE_ENV == "development" ? 'http://api.sanqi.us/blog' : 'http://api.sanqi.us/blog';

//title
const Title: FC<any> = ({ str, href }) => (
    <h3 className='title'>
        <a href={href}>{str}</a>
    </h3>
)
//信息
const BreadInfo: FC<any> = ({ name, date, cate, commentCount }) => (
    <Breadcrumb style={{ fontSize: '12px' }}>
        <Breadcrumb.Item>发表于 {date}</Breadcrumb.Item>
        <Breadcrumb.Item>
            <Breadcrumb separator="," style={{ fontSize: '12px', display: 'inline-block' }}>
                {
                    cate.map((item: any, index: number) => (
                        <Breadcrumb.Item key={index}>{item.name}</Breadcrumb.Item>
                    ))
                }
            </Breadcrumb>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            {
                commentCount == 0 ? '暂无评论' : `${commentCount} 条评论`
            }
        </Breadcrumb.Item>
    </Breadcrumb>
)
//预览
const PreBody: FC<any> = ({ str }) => (
    <div className='pre-body'>
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: ' ' }}>
            {str}
        </Paragraph>
    </div>
)

//正文
const Body: FC<any> = ({ str }) => (
    <div className='pre-body'>
        <div dangerouslySetInnerHTML={{ __html: str }} className="braft-output-content" />
    </div>
)

//分页
const PageChange: FC<any> = ({ pageNum, pageSize, total, changeFunction }) => (
    <div style={{ width: '100%', height: '80px' }}>
        <Pagination
            current={pageNum + 1}
            total={total}
            pageSize={pageSize}
            style={{ width: 'fit-content', margin: '40px auto' }}
            onChange={(page) => { changeFunction(page - 1) }}
        />
    </div>
)


//一个文章 item
const ArticleItem: FC<any> = ({ item, isSmall }) => (
    <BodyDiv needDashed isSmall={isSmall}>
        <Title str={item.title} href={`/detail/${item.id}`} />
        <RenderDatas data={JSON.parse(item.datas)} isList isSmall={isSmall} />
        <PreBody str={item.prebody} />
        <BreadInfo name='博主' date={item.datetime} cate={JSON.parse(item.classify)} commentCount={item.commentCount} />
    </BodyDiv>
)

export {
    Title, BreadInfo, PreBody, PageChange, Body, ArticleItem, baseUrl
};