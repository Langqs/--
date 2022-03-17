import request from '@/utils/request'

//获取SPU列表
export const reqSpuList=(page,limit,category3Id)=>{
    return request({
        url:`/admin/product/${page}/${limit}`,
        params:{category3Id},
        method:'get'
    })
}
//获取spu信息
export const reqSpu=(spuId)=>{
    return request({
        url:`/admin/product/getSpuById/${spuId}`,
        method:'get'
    })
}
//获取品牌信息
export const reqTradeMark=()=>{
    return request({
        url:'/admin/product/baseTrademark/getTrademarkList',
        method:'get'
    })
}
//获取spu图标接口
export const reqSpuImage=(spuId)=>{
    return request({
        url:`/admin/product/spuImageList/${spuId}`,
        method:'get'
    })
}
// 获取销售属性
export const reqBaseSaleAttrList=()=>{
    return request({
        url:'/admin/product/baseSaleAttrList',
        method:'get'
    })
}
//提交 spu 
export const reqSpuInfo=(data)=>{
    return request({
        url:'/admin/product/saveSpuInfo',
        data,
        method:'post'
    })
}
// 修改|添加 Spu 参数大致一样，唯一区别就是是否携带id
export const reqAddUpdateInfo=(data)=>{
    if (data.id) {
        return request({
            url:'/admin/product/updateSpuInfo',
            data,
            method:'post'
        })
    }else{
        return request({
            url:'/admin/product/saveSpuInfo',
            data,
            method:'post'
        })
    }
}
// 删除 Sku
export const reqDeleteSpu=(spuId)=>{
    return request({
        url:`/admin/product/deleteSpu/${spuId}`,
        method:'delete'
    })
}


// 获取spu img数据
export const reqSpuImageList=(spuId)=>{
    return request({
        url:`/admin/product/spuImageList/${spuId}`,
        method:'get'
    })
}
//获取 销售属性的数据
export const reqSpuSaleAttrList=(spuId)=>{
    return request({
        url:`/admin/product/spuSaleAttrList/${spuId}`,
        method:'get'
    })
}
// 获取平台 属性值的数据
export const reqAttrInfoList=(category1Id,category2Id,category3Id)=>{
    return request({
        url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method:'get'
    })
}
//添加sku
export const reqAddSku=(data)=>{
    return request({
        url:'/admin/product/saveSkuInfo',
        data,
        method:'post'
    })
}
// 获取sku列表数据接口
export const reqSkuList=(spuId)=>{
    return request({
        url:`/admin/product/findBySpuId/${spuId}`,
        method:'get'
    })
}