/** 主入口js */
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import permission from './utils/permission';
import './styles/index.scss';
import EleAdmin from 'ele-admin';
import DialogDirective from 'ele-admin/packages/utils/dialog-directive';
import VueClipboard from 'vue-clipboard2';
import i18n from './i18n';
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer, {
    defaultOptions: {
      inline: false,
      backdrop: true,
      button: true,
      focus: true,
      fullscreen: true,
      loading: true,
      loop: true,
      keyboard: true,
      movable: true,
      navbar: true,
      rotatable: true,
      scalable: true,
      slideOnTouch: true,
      title: false,
      toggleOnDblclick: true,
      toolbar: true,
      tooltip: true,
      transition: true,
      zoomable: true,
      zoomOnTouch: true,
      zoomOnWheel: true,
      zIndex: 9999
    }
  })

Vue.config.productionTip = false;
Vue.use(EleAdmin, {
  response: {
    dataName: 'list'
  },
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(permission);
Vue.use(DialogDirective);
Vue.use(VueClipboard);



new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
