import { userData } from '@/api/user'
const state = { user: {}, userDataList: [] }
const mutations = {
  // 密码和用户名
  setUser (state, playload) {
    state.user = playload
  },
  // 用户的信息
  getUserData (state, playload) {
    state.userDataList = playload
  }

}

const actions = {
  // 用户数据
  async setUser (context, data) {
    const res = await userData(data)
    console.log(1, res)
    context.commit('getUserData', res.data.data)
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
