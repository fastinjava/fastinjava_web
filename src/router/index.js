import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ORG_MANAGE from '@/module/admin/org_manage/page/org_manage.vue'
import ROLE_MANAGE from '@/module/admin/role_manage/page/role_manage.vue'
import APP_MANAGE from '@/module/admin/app_manage/page/app_manage.vue'
import API_MANAGE from '@/module/admin/api_manage/page/api_manage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/role_manage',
      name: 'ROLE_MANAGE',
      component: ROLE_MANAGE
    },{
      path: '/app_manage',
      name: 'APP_MANAGE',
      component: APP_MANAGE
    },{
      path: '/api_manage',
      name: 'API_MANAGE',
      component: API_MANAGE
    },
    {
      path: '/org_manage',
      name: 'ORG_MANAGE',
      component: ORG_MANAGE
    }
  ]
})
