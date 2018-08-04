// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { config } from './helpers/firebaseConfig';
import { formatDate } from './helpers/date';

Vue.config.productionTip = false;

Vue.filter('formatDate', formatDate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/activities');
      } else {
        this.$router.push('/');
      }
    });
  },
  components: { App },
  template: '<App/>',
});
