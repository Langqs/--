//平台属性管理
import request from '@/utils/request'

//一级分类
export const reqCategory1List = ()=>{
    return request({
        url:'/admin/product/getCategory1',
        method:'get'
    })
}
//二级分类
export const reqCategory2List = (id)=>{
    return request({
        url:`/admin/product/getCategory2/${id}`,
        method:'get'
    })
}
//三级分类
export const reqCategory3List = (id)=>{
    return request({
        url:`/admin/product/getCategory3/${id}`,
        method:'get'
    })
}
//三级分类
export const reqTrademarkList = (id)=>{
    const {category1Id,category2Id,category3Id} = id
    return request({
        url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method:'get'
    })
}
//删除商品分类属性
export const reqDeleteAttr = (id)=>{
    return request({
        url:`/admin/product/deleteAttr/${id}`,
        method:'delete'
    })
}
//添加属性与属性值接口
export const reqAddAttr = (data)=>{
    return request({
        url:'/admin/product/saveAttrInfo',
        data,
        method:'post'
    })
}