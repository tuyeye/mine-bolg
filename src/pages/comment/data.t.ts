
//请求格式
export interface requestComment{
    article_id:number;
    body:string;
    name:string;
    email:string;
    website?:string;
    parent_id?:number;
}

