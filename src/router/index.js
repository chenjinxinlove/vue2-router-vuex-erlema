/**
 * Created by Admin on 2016/11/21.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import goods from '../components/goods/goods';
import ratings from '../components/content/ratings';
import seller from '../components/content/seller';

Vue.use(VueRouter);

const rt = [
  {path: '/goods', name: goods, component: goods},
  {path: '/ratings', name: ratings, component: ratings},
  {path: '/seller', name: seller, component: seller}
];

const router = new VueRouter({
  routes: rt,
  history: true,
  mode: 'history',
  linkActiveClass: 'active'
});

export default router;

