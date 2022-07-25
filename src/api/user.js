import request from '@/utils/request'
/**
 *登录接口封装
 * @param {username用户,password密码} param0
 * @returns
 */
export const login = ({ username, password }) => {
  return request({
    url: 'login',
    method: 'POST',
    data: { username, password }
  })
}
/**
 *
 * @returns  用户数据列表
 */
export const userData = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'users',
    params: { query, pagenum, pagesize }
  })
}
/**
 *
 * @returns 添加用户
 */
export const addUser = ({ username, password, email, mobile }) => {
  return request({
    url: 'users',
    method: 'POST',
    data: { username, password, email, mobile }
  })
}
/**
 *
 * @param {修改用户状态} param0
 * @returns
 */
export const changeUser = ({ uid, type }) => {
  return request({
    url: 'users/:uId/state/:type',
    method: 'PUT'
  })
}
/**
 *
 * @param {编辑用户数据} param0
 * @returns
 */
export const editUser = ({ id, email, mobile }) => {
  return request({
    url: `users/${id}`,
    method: 'PUT',
    data: { email, mobile }
  })
}
/**
 *
 * @param {删除用户} id
 * @returns
 */
export const delUser = id => {
  return request({
    url: `users/${id}`,
    method: 'DELETE'
  })
}
/**
 *
 * @param {根据 ID 查询用户信息} id
 * @returns
 */
export const checkId = (id) => {
  return request({
    url: `users/${id}`
  })
}
/**
 *
 * @param {分配用户角色} param0
 * @returns
 */
export const addRole = ({ id, rid }) => {
  return request({
    url: `users/${id}/role`,
    method: 'PUT',
    data: { rid }

  })
}
