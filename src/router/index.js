import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '/lectures',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/lecturesDetail/:id(\\d+)',
        name: 'lecturersDetail',
        component: ()=> import('@/views/essential/lecturers/detail'),
        meta: {title: '讲师信息详情', icon : ''}
      }
    ]
  },
  {
    path: '/lectures',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/adminssions/:id(\\d+)',
        name: 'adminssionsDetail',
        component: ()=> import('@/views/essential/adminssionsTeacher/detail'),
        meta: {title: '招生老师信息详情', icon : ''}
      }
    ]
  },
  {
    path: '/banji',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/banji/:id(\\d+)',
        name: 'banjiDetail',
        component: ()=> import('@/views/business/banji/detail'),
        meta: {title: '班级信息详情', icon : ''}
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  {
    path: '/essential',
    component: Layout,
    redirect: '/essential',
    children: [
      {
        path: 'employee',
        name: 'employee',
        component: () => import('@/views/essential/employee/index'),
        meta: {title: '员工信息', icon: 'ums-admin'}
      },
      {
        path: 'lecturers',
        name: 'lecturers',
        component: () => import('@/views/essential/lecturers/index'),
        meta: {title: '讲师信息', icon: 'ums-admin'}
      },
      {
        path: 'adminssionsTeacher',
        name: 'adminssionsTeacher',
        component: () => import('@/views/essential/adminssionsTeacher/index'),
        meta: {title: '招生老师信息', icon: 'ums-admin'}
      },
      {
        path: 'company',
        name: 'company',
        component: () => import('@/views/essential/company/index'),
        meta: {title: '单位名称', icon: 'ums-admin'}
      },

    ],
    meta: {title: '人员信息', icon: 'sms-ad'}
  },
  {
    path: '/business',
    component: Layout,
    redirect: '/business',
    meta: {title: '业务处理', icon: 'sms-ad'},
    children: [
      {
        path: 'stuInfo',
        name: 'stuInfo',
        component: () => import('@/views/business/stuInfo/index'),
        meta: {title: '学员信息', icon: 'ums-admin'}
      },
      {
        path: 'banji',
        name: 'banji',
        component: () => import('@/views/business/banji/index'),
        meta: {title: '班级信息', icon: 'ums-admin'}
      },
    ]
  }
]

export const asyncRouterMap = [

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

