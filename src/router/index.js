import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Order from "../views/Order.vue";
// import Add from "../views/Add.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/order",
    name: "Reports",
    component: Order,
  },
  {
    path: "/order",
    name: "Messages",
    component: Order,
  },
  {
    path: "/order",
    name: "Payments",
    component: Order,
  },
  // {
  //   path: "/order/add",
  //   name: "AddOrder",
  //   component: Add,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
