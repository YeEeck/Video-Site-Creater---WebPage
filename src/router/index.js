import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/video/:index",
    name: "video",
    component: () => import("../views/VideoView.vue"),
  },
  {
    path: "/collections",
    name: "collections",
    component: () => import("../views/CollectionsView.vue"),
  },
  {
    path: "/collection/:index",
    name: "collection",
    component: () => import("../views/CollectionView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
