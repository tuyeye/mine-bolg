import request from '@/pages/assemblies/request';
import { baseUrl } from '@/pages/assemblies/basic';
import { requestDetail } from './data.t';

//获取文章列表
export function queryDetail(params: requestDetail) {
    return request(`${baseUrl}/blogdetail`, { params });
}