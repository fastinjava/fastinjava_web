import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ORG_MANAGE from '@/module/admin/org_manage/page/org_manage.vue'
import ROLE_MANAGE from '@/module/admin/role_manage/page/role_manage.vue'
import APP_MANAGE from '@/module/admin/app_manage/page/app_manage.vue'
import API_MANAGE from '@/module/admin/api_manage/page/api_manage.vue'
import MENU_MANAGE from '@/module/admin/menu_manage/page/menu_manage.vue'
import OAUTH_MANAGE from '@/module/admin/oauth_manage/page/oauth_manage.vue'
import USER_MANAGE from '@/module/admin/user_manage/page/user_manage.vue'
import GENCODE_MANAGE from '@/module/admin/gencode_manage/page/gencode_manage.vue'
import CODE_GEN_TABLES from '@/module/admin/gencode_manage/page/code_gen_tables.vue'
import LOGIN_MANAGE from '@/module/admin/login_manage/page/login_manage.vue'
import FILE_GROUP from '@/module/admin/file_manage/page/file_group.vue'
import JAVA_LEARN_MAP from '@/module/admin/test/page/java_learn_map.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },  {
      path: '/file_group',
      name: 'FILE_GROUP',
      component: FILE_GROUP
    }, {
      path: '/role_manage',
      name: 'ROLE_MANAGE',
      component: ROLE_MANAGE
    },{
      path: '/java_learn_map',
      name: 'JAVA_LEARN_MAP',
      component: JAVA_LEARN_MAP
    },{
      path: '/oauth_manage',
      name: 'OAUTH_MANAGE',
      component: OAUTH_MANAGE
    },{
      path: '/menu_manage',
      name: 'MENU_MANAGE',
      component: MENU_MANAGE
    },{
      path: '/login_manage',
      name: 'LOGIN_MANAGE',
      component: LOGIN_MANAGE
    },{
      path: '/gencode_manage',
      name: 'GENCODE_MANAGE',
      component: GENCODE_MANAGE
    },{
      path: '/code_gen_tables',
      name: 'CODE_GEN_TABLES',
      component: CODE_GEN_TABLES
    },{
      path: '/app_manage',
      name: 'APP_MANAGE',
      component: APP_MANAGE
    },{
      path: '/api_manage',
      name: 'API_MANAGE',
      component: API_MANAGE
    },{
      path: '/user_manage',
      name: 'USER_MANAGE',
      component: USER_MANAGE
    },
    {
      path: '/org_manage',
      name: 'ORG_MANAGE',
      component: ORG_MANAGE
    }
  ]
})
