import React, { FC } from 'react';
import RenderData from './datas';
import moment from 'moment';
import {
    Typography, Breadcrumb, Pagination, Input, Form,
    Row, Col, Button
} from 'antd';
import './styles/blogItem.css';

const { Paragraph } = Typography;
const { TextArea } = Input;

//请求头
const baseUrl = process.env.NODE_ENV == "development" ? 'https://localhost:5001/blog' : 'http://api.twoyecloud.com/blog';

//title
const Title: FC<any> = ({ str, href }) => {
    return (
        <h3 className='title'>
            <a href={href}>{str}</a>
        </h3>
    )
}

//信息
const BreadInfo: FC<any> = ({ name, date, cate, commentCount }) => {
    return (
        <Breadcrumb style={{ fontSize: '12px' }}>
            <Breadcrumb.Item><a href="javascript:;">{name}</a> 发表于 {moment(date).format('YYYY年MM月DD日 HH:mm')}</Breadcrumb.Item>
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
}

//预览
const PreBody: FC<any> = ({ str }) => {

    return (
        <div className='pre-body'>
            <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: ' ' }}>
                {str}
            </Paragraph>
        </div>
    )
}

//正文
const Body: FC<any> = ({ str }) => (
    <div className='pre-body'>
        <div dangerouslySetInnerHTML={{ __html: str }} className="braft-output-content" />
    </div>
)

//虚线边框
const DashedBody: FC<any> = ({ children }) => {
    return (
        <div style={{ borderBottom: '1px dashed #ddd', padding: '50px 0' }}>
            <div style={{ width: '850px', margin: '0 auto', position: 'relative' }}>
                {children}
            </div>
        </div>
    )
}

//无虚线边框
const NoDashedBody: FC<any> = ({ children }) => {
    return (
        <div style={{ padding: '50px 0' }}>
            <div style={{ width: '850px', margin: '0 auto', position: 'relative' }}>
                {children}
            </div>
        </div>
    )
}

//分页
const PageChange: FC<any> = ({ pageNum, pageSize, total, changeFunction }) => {


    return (
        <div style={{ width: '100%', height: '80px' }}>
            <Pagination
                defaultCurrent={pageNum + 1}
                total={total}
                pageSize={pageSize}
                style={{ width: 'fit-content', margin: '40px auto' }}
                onChange={(page) => { changeFunction(page - 1) }}
            />
        </div>
    )
}

//评论
const CommentSubmit: FC<any> = ({ discomment }) => {
    return (
        <>
            {discomment && (
                <div className='no-content'>此文章已经关闭了评论。</div>
            )}
            {
                !discomment && (
                    <div style={{ width: '100%', position: 'relative' }}>
                        <h3>发表评论</h3>
                        <p style={{ position: 'absolute', right: '0', top: '0', fontSize: '12px', color: '#b1b5b9', marginBottom: '15px' }}>电子邮件地址不会被公开。</p>
                        <Form >
                            <Form.Item name='body' rules={[{ required: true, message: '评论内容不可以为空哦' }]}>
                                <TextArea
                                    allowClear
                                    autoSize={{ minRows: 4, maxRows: 5 }}
                                />
                            </Form.Item>
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Form.Item label='姓名' name='name' rules={[{ required: true, message: '姓名是必要的' }]}>
                                        <Input placeholder='请输入' />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='邮箱' name='email' rules={[{ required: true, message: '邮箱必要，但不会公开' }]}>
                                        <Input placeholder='请输入' />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label='website' name='站点' >
                                        <Input placeholder='选填' />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button type='primary' htmlType='submit'>发表评论</Button>
                            </Form.Item>
                        </Form>
                    </div>
                )
            }
        </>
    )
}

//一个文章 item
const ArticleItem: FC<any> = ({ item }) => (
    <DashedBody>
        <Title str={item.title} href={`/detail/${item.id}`} />
        <RenderData data={JSON.parse(item.datas)} />
        <PreBody str={item.prebody} />
        <BreadInfo name='博主' date={item.datetime} cate={JSON.parse(item.classify)} commentCount={item.commentCount} />
    </DashedBody>
)


export {
    Title, DashedBody, NoDashedBody, BreadInfo, PreBody, RenderData, PageChange, Body,
    CommentSubmit, ArticleItem,baseUrl
};