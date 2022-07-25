import request from '@/utils/request'
/**
 *
 * @param {值 list 或 tree , list 列表显示权限, tree 树状显示权限,参} param0
 * @returns
 */
export const roleData = (type) => {
  return request({
    url: `rights/${type}`
  })
}
// 角色列表
export const roleList = (params) => {
  return request({
    url: 'roles',
    params
  })
}
/**
 *
 * @param {角色授权} param0
 * @returns
 */
export const roleIdRight = (roleId, rids) => {
  return request({
    url: `roles/${roleId}/rights`,
    method: 'POST',
    data: { rids }
  })
}
