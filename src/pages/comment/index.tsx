import React, { FC, useEffect, useState } from 'react';
import { connect } from 'dva';
import { Form, Input, Row, Col, Button, Comment, Avatar, message, Spin, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useParams } from "umi";
import moment from 'moment';

const { TextArea } = Input;

const namespace = 'comment';

const RepeatCompt: FC<any> = ({ isSmall, dispatch, parent_id, hide }) => {

    const respon = {
        span: isSmall ? 24 : 8
    };
    const params: any = useParams();

    const submit = async (payload: any) => {
        if (parent_id) payload.parent_id = parent_id;
        payload.article_id = parseInt(params.id);
        await dispatch({ type: `${namespace}/commit`, payload });
        await dispatch({ type: `${namespace}/getList`, payload: { id: params.id } });
        if (parent_id) {
            message.success("回复成功");
            hide();
        }
    }

    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <h3>发表评论</h3>
            <p style={{ position: 'absolute', right: '0', top: '0', fontSize: '12px', color: '#b1b5b9', marginBottom: '15px' }}>电子邮件地址不会被公开。</p>
            <Form onFinish={submit}>
                <Form.Item name='body' rules={[{ required: true, message: '评论内容不可以为空哦' }]}>
                    <TextArea
                        allowClear
                        autoSize={{ minRows: 4, maxRows: 5 }}
                    />
                </Form.Item>
                <Row gutter={[16, 16]}>
                    <Col {...respon}>
                        <Form.Item label='姓名' name='name' rules={[{ required: true, message: '姓名是必要的' }]}>
                            <Input placeholder='请输入' />
                        </Form.Item>
                    </Col>
                    <Col {...respon}>
                        <Form.Item label='邮箱' name='email' rules={[{ required: true, message: '邮箱必要，但不会公开' }]}>
                            <Input placeholder='请输入' />
                        </Form.Item>
                    </Col>
                    <Col {...respon}>
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

const BaseComment: FC<any> = ({ children, id, name, body, datetime, allowRepeat, dispatch }) => {

    const [vis, setVis] = useState<boolean>(false);

    return (
        <>
            <Comment
                datetime={moment(datetime).format("YYYY年MM月DD日 HH:mm")}
                actions={allowRepeat ? [
                    <span key="comment-nested-reply-to" onClick={() => setVis(true)}>回复</span>
                ] : []}
                author={<a href="javascript:;">{name}</a>}
                avatar={
                    <Avatar shape="square" icon={<UserOutlined />} />
                }
                content={
                    <p>
                        {body}
                    </p>
                }
            >
                {children}
            </Comment>
            <Modal
                visible={vis}
                onCancel={() => setVis(false)}
                title={`回复 ${name}`}
                footer={null}

            >
                <RepeatCompt isSmall={true} dispatch={dispatch} parent_id={id} hide={() => { setVis(false) }} />
            </Modal>
        </>
    )
};

const Comments: FC<any> = ({ comment: { data, total, loading }, dispatch, discomment, isSmall }) => {

    const params: any = useParams();

    useEffect(() => {
        dispatch({ type: `${namespace}/getList`, payload: { id: params.id } });
    }, [])

    return (
        <>
            {discomment && (
                <div className='no-content'>此文章已经关闭了评论。</div>
            )}
            {
                !discomment && (
                    <>
                        {total !== 0 && (
                            <>
                                <h3>共 {total} 条评论</h3>
                                <Spin spinning={loading} tip="请稍后 ...">
                                    {data.map((item: any, index: number) => (
                                        <BaseComment {...item} key={index} allowRepeat isSmall={isSmall} dispatch={dispatch}>
                                            {
                                                item.children.map((e: any, f: number) => (
                                                    <BaseComment {...e} key={f} />
                                                ))
                                            }
                                        </BaseComment>
                                    ))}
                                </Spin>
                            </>
                        )}
                        {
                            total===0&&(
                                <div className='no-content'>还没有人评论呢，快来评论吧 ～</div>
                            )
                        }
                        <RepeatCompt isSmall={isSmall} dispatch={dispatch} />
                    </>
                )
            }
        </>
    )
}

export default connect(({ comment }: any) => ({ comment }))(Comments);