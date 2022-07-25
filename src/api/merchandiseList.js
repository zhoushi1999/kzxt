import request from '@/utils/request'
/**
 *
 * @param {商品列表数据
} params
 * @returns
 */
export const getMerchandiseList = params => {
  return request({
    url: 'goods',
    params
  })
}
/***
 *  添加商品
 */
export const addGoods = (data) => {
  return request({
    url: 'goods',
    method: 'POST',
    data
  })
}
/**
 *
 * @param {商品分类数据列表} param0
 * @returns
 */
export const getSortData = ({ type, pagenum, pagesize }) => {
  return request({
    url: 'categories',
    params: { type, pagenum, pagesize }

  })
}
