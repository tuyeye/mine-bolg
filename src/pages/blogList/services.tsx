import request from '@/pages/assemblies/request';
import { requestParams } from './data.t';
import { baseUrl } from '@/pages/assemblies/basic';

//获取文章列表
export function queryArticleList(params: requestParams) {
    return request(`${baseUrl}/bloglist`, { params });
}