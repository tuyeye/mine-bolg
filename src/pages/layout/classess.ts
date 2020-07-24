export interface datas {
    type: string;
    urls: string[];
}

export interface Img {
    src: string;
    alt: string;
}

//用于 ul 渲染图片
export interface ImgItemConfig {
    list: Img[];
    width: string;
}

export interface cate {
    name: string;
    id: number;
}

export interface breadInfo {
    name: string;
    date: string;
    cate: cate[];
    commentCount: number;
}

export interface detailData {
    title: string;
    breadInfo: breadInfo;
    datas: datas;
    preBody: string;
    discomment: boolean;
}

export interface requestData {
    pageNum: number;
    pageSize: number;
    classify?: number;
    searchKey?: string;
}