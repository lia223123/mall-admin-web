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
    path: '/tender',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/tender/:id(\\d+)',
        name: 'tender',
        component: ()=> import('@/views/business/tenderProjects/detail'),
        meta: {title: '中标项目详情', icon : ''}
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
    path: '/stuInfo',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/stuInfo/:id(\\d+)',
        name: 'stuInfo',
        component: ()=> import('@/views/business/stuInfo/detail'),
        meta: {title: '学生信息详情', icon : ''}
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: '/document',
    children: [{
      path: 'document',
      name: 'document',
      component: ()=>import('@/views/document/index'),
      meta: {title: '公司资料', icon: 'home'}
    }]
  },
  {
    path: '/fileCom',
    component: Layout,
    redirect: '/fileCom',
    children: [{
      path: 'fileCompany',
      name: 'fileCompany',
      component: () => import('@/views/essential/fileCompany/index'),
      meta: {title: '公司单位', icon: 'product'}
    },]
  },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: '/home',
  //   children: [{
  //     path: 'home',
  //     name: 'home',
  //     component: () => import('@/views/home/index'),
  //     meta: {title: '首页', icon: 'home'}
  //   }]
  // },
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
        meta: {title: '学员单位名称', icon: 'ums-admin'}
      },


    ],
    meta: {title: '人员信息', icon: 'ums-resource'}
  },
  {
    path: '/business',
    component: Layout,
    redirect: '/business',
    meta: {title: '业务处理', icon: 'product-attr'},
    children: [
      {
        path: 'tenderProject',
        name: 'tenderProject',
        component: () => import('@/views/business/tenderProjects/index'),
        meta: {title: '中标项目', icon: 'product-brand'}
      },
      {
        path: 'banji',
        name: 'banji',
        component: () => import('@/views/business/banji/index'),
        meta: {title: '班级信息', icon: 'product-list'}
      },
      {
        path: 'stuInfo',
        name: 'stuInfo',
        component: () => import('@/views/business/stuInfo/index'),
        meta: {title: '学员信息', icon: 'user'}
      },
      {
        path: 'renSheJu',
        name: 'renSheJu',
        component: () => import('@/views/business/renSheJu/index'),
        meta: {title: '人社局信息', icon: 'product-cate'}
      },
      {
        path: 'trainBook',
        name: 'trainBook',
        component: () => import('@/views/business/trainBook/index'),
        meta: {title: '证书信息', icon: 'sms-subject'}
      },
      {
        path: 'Identify',
        name: 'Identify',
        component: () => import('@/views/business/Identify/index'),
        meta: {title: '工种鉴定机构', icon: 'sms'}
      },
    ]
  },
  {
    path: '/Finance',
    component: Layout,
    redirect: '/Finance',
    meta: {title: '财务处理', icon: 'sms-ad'},
    children: [
      {
        path: 'Finance',
        name: 'Finance',
        meta: {title: '财务处理', icon: 'ums-admin'}
      }
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

