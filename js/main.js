'use strict';

import navBar from './cmps/header-nav-cmp.js';
import footerCmp from './cmps/footer-cmp.js';
import routes from './routes.js';

Vue.use(VueRouter);
// Vue.use('')
const router = new VueRouter({ routes: routes });

new Vue({
  router,
  el: '.app',
  components: {
    navBar,
    footerCmp
  },
  created() {}
});
