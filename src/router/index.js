/*
 * @Author: your name
 * @Date: 2021-03-29 19:00:07
 * @LastEditTime: 2021-05-02 22:01:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \2020\registeration\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import '../assets/css/global.css'
import Home from '../components/home.vue'
import ManagerLogin from '../components/managerLogin.vue'
import Manager from '../components/manager.vue'
import Apartment from '../components/apartments.vue'
import AssignList from '../components/assignList.vue'
import Round from '../components/round.vue'
import TaskIssue from '../components/taskIssue.vue'
import Super from '../components/super.vue'
import SuperApartments from '../components/superApartments.vue'
import newDepartment from '../components/newDepartment.vue'
import Register from '../components/register.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/home', component: Home },
  { path: '/manager/login', component: ManagerLogin },
  { path: '/manager', name: 'manager', component: Manager },
  { path: '/manager/apartments', component: Apartment },
  { path: '/manager/assignList', component: AssignList },
  { path: '/manager/round', component: Round },
  { path: '/manager/issue', component: TaskIssue },
  { path: '/super', component: Super },
  { path: '/super/apartments', component: SuperApartments },
  { path: '/super/newDepartment', component: newDepartment },
  { path: '/auth/register', component: Register },
  { path: '/*', redirect: '/home' }
]

const router = new VueRouter({
  routes
})

export default router
