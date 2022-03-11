//品牌管理
import request from '@/utils/request'

//品牌列表
export const reqTradeMark = (page,limit)=>{
    return request({
        url:`/admin/product/baseTrademark/${page}/${limit}`,
        method:'get'
    })
}

//添加品牌
export const reqAddTradeMark=(data)=>{
    return request({
        url:'/admin/product/baseTrademark/save',
        data,
        method:'post'
    })
}
//修改品牌
export const reqUpdateTradeMark=(data)=>{
    return request({
        url:'/admin/product/baseTrademark/update',
        data,
        method:'put'
    })
}
//删除品牌
export const reqDeleteTradeMark=(id)=>{
    return request({
        url:`/admin/product/baseTrademark/remove/${id}`,
        method:'delete'
    })
}