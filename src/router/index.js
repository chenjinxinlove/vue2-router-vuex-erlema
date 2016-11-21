/**
 * Created by Admin on 2016/11/21.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import goods from '../components/content/goods';
import ratings from '../components/content/ratings';
import seller from '../components/content/seller';

Vue.use(VueRouter);

const routers = [
  {path: '/goods', name: goods, components: goods},
  {path: '/ratings', name: ratings, components: ratings},
  {path: '/seller', name: seller, components: seller}
];

const router = new VueRouter({
  routes: routers,
  history: true
});

export default router;

