import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
const Wolcome = () => import('@/views/Wolcome')
const User = () => import('@/views/User')
const Role = () => import('@/views/Role')
const Permission = () => import('@/views/Role/Permission.vue')
const Classify = () => import('@/views/Merchandise/Classify.vue')
const MerchandiseList = () => import('@/views/Merchandise/MerchandiseList.vue')
const CommodityClassification = () => import('@/views/Merchandise/CommodityClassification.vue')
const AddGoods = () => import('@/views/Merchandise/AddGoods.vue')
const Order = () => import('@/views/order/index.vue')
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    children: [
      { path: 'wolcome', component: Wolcome },
      { path: 'user', component: User },
      { path: 'role', component: Role },
      { path: 'permission', component: Permission },
      { path: 'classify', component: Classify },
      { path: 'merchandiseList', component: MerchandiseList },
      { path: 'commodityClassification', component: CommodityClassification },
      { path: 'addgoods', component: AddGoods },
      { path: 'order', component: Order }

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
