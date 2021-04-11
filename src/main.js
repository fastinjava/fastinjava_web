// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


/*element ui*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
Vue.use(Avue);

//如果使用字典需要赋值axios为全局
// import axios from 'axios';
// window.axios=axios


import moment from 'moment'; //导入模块
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn');
Vue.prototype.$moment = moment;//赋值使用


import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';

VueMarkdownEditor.use(vuepressTheme);
Vue.use(VueMarkdownEditor);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
