import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/rooms',
      name: 'roomenter',
      component: () => import(/* webpackChunkName: "about" */ './components/RoomEnter.vue'),
    },
    {
      path :'/game',
      name : 'game',
      component : () => import(/* webpackChunkName: "game" */ './views/game.vue')
    },
    {
      path: '/rooms/:id',
      name: 'Rooms',
      component: () => import(/* webpackChunkName: "about" */ './views/Room.vue'),
    },
  ],
});
