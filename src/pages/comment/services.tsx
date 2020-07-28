import request from '@/pages/assemblies/request';
import { requestComment } from './data.t';
import { baseUrl } from '@/pages/assemblies/basic';

//提交
export function postComment(params: any) {
    return request(`${baseUrl}/blogcomment`, {
        method: 'post',
        data: params
    })
}

//获取
export function getComment(params: any) {
    return request(`${baseUrl}/blogcommentget`, { params })
}