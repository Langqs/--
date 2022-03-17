import request from '@/utils/request'
// 获取 Sku列表
export const reqSkuList = (page,limit)=>{
    return request({
        url:`/admin/product/list/${page}/${limit}`,
        method:'get'
    })
}
//上架
export const reqOnSku=(skuId)=>{
    return request({
        url:`/admin/product/onSale/${skuId}`,
        method:'get'
    })
}
//下架
export const reqOffSku=(skuId)=>{
    return request({
        url:`/admin/product/cancelSale/${skuId}`,
        method:'get'
    })
}
// 详情数据
export const reqSkuInfo=(skuId)=>{
    return request({
        url:`/admin/product/getSkuById/${skuId}`,
        method:'get'
    })
}
// 删除
export const reqDeleteSku=(skuId)=>{
    return request({
        url:`/admin/product/deleteSku/${skuId}`,
        method:'delete'
    })
}