import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ORG_MANAGE from '@/module/admin/org_manage/page/org_manage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/org_manage',
      name: 'ORG_MANAGE',
      component: ORG_MANAGE
    }
  ]
})
