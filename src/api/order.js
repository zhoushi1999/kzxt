import request from '@/utils/request'
/**
 *
 * @param {. 订单数据列表} param0
 * @returns
 */
export const getOrder = ({ pagenum, pagesize }) => {
  return request({
    url: '/orders',
    params: { pagenum, pagesize }
  })
}
