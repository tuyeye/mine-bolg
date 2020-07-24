
//对于此组件，请提供类型为 datas 的 data 入参

import React, { FC, useState, useEffect } from 'react';
import QueueAnim from 'rc-queue-anim';
import Zmage from 'react-zmage';
import { ImgItemConfig, Img } from '@/pages/layout/classess';
import './styles/datas.css';

const RenderNull: FC<any> = () => (<></>)

const RenderImg: FC<any> = ({ data, isList }) => {

    const [config, setConfig] = useState<ImgItemConfig>({
        list: [],
        width: '25%'
    });

    useEffect(() => {

        let showList = data.urls;

        if (isList) showList = showList.slice(0, 4);

        let length = showList.length > 4 ? 4 : showList.length;

        let theData: any[] = [];
        showList.forEach((url: string) => {
            theData.push({
                src: url,
                alt: ''
            })
        });

        setConfig({
            list: theData,
            width: `${100 / length}%`
        });

    }, []);


    return (
        <QueueAnim
            component="ul"
            style={{ listStyle: 'none', overflow: 'hidden', paddingLeft: '0px', width: '100%', margin: '0 auto' }}
            duration={1500}
        >
            {
                (config.list).map((item: Img, index: number) => (
                    <li key={index} style={{ float: 'left', width: config.width, textAlign: 'center', padding: '10px' }}>
                        <div onClick={() => {
                            Zmage.browsing({
                                set: config.list,
                                defaultPage: index,
                            })
                        }}>
                            <img src={item.src} className='Image-item' style={{ height: config.list.length <= 2 ? '300px' : '200px' }} />
                        </div>
                    </li>
                ))
            }
        </QueueAnim>
    )
}

const RenderVideo: FC<any> = ({ data }) => {
    return (
        <QueueAnim
            duration={1500}
            type='bottom'
        >
            {
                (data.urls).map((item: string, index: number) => (
                    <video src={item} controls key={index} style={{ width: '100%' }}>
                        您的浏览器不支持 video 标签。
                    </video>
                ))
            }
        </QueueAnim>
    )
}

const RenderMusic: FC<any> = ({ data }) => {
    return (
        <QueueAnim
            duration={1500}
            type='bottom'
        >
            {
                (data.urls).map((item: string, index: number) => (
                    <audio src={item} key={index} controls style={{ width: '100%' }}>
                        您的浏览器不支持 audio 标签。
                    </audio>
                ))
            }
        </QueueAnim>
    )
}

const page: FC<any> = ({ data }: any) => (
    <div style={{ margin: '20px 0' }}>
        {data.type === 'nothing' && (<RenderNull />)}
        {data.type === 'image' && (<RenderImg data={data} />)}
        {data.type === 'video' && (<RenderVideo data={data} />)}
        {data.type === 'music' && (<RenderMusic data={data} />)}
    </div>
)

export default page;