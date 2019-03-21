import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase/app';
import 'firebase/firestore'

Vue.config.productionTip = false;

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCknkfmA01w2VNKR0HCQ9JptsIZx8D077I",
  authDomain: "translate-racer.firebaseapp.com",
  databaseURL: "https://translate-racer.firebaseio.com",
  projectId: "translate-racer",
  storageBucket: "translate-racer.appspot.com",
  messagingSenderId: "523628763033"
};
firebase.initializeApp(config);

Vue.prototype.$db = firebase.firestore();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
