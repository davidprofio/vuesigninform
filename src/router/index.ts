import Vue from 'vue';
import VueRouter, { RouteConfig, RouterOptions } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
] as RouteConfig[];
const routerOptions = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
} as RouterOptions;
const router = new VueRouter(routerOptions);

export default router;
