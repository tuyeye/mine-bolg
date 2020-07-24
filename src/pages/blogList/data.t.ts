//请求列表数据
export interface requestParams {
    pageNum: number;
    pageSize: number;
    classify?: number;
    searchKey?: string;
}