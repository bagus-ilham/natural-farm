import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Order from "../views/Order.vue";
import Add from "../views/Add.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/reports",
    name: "Reports",
    component: Order,
  },
  {
    path: "/messages",
    name: "Messages",
    component: Order,
  },
  {
    path: "/payments",
    name: "Payments",
    component: Order,
  },
  {
    path: "/order/add",
    name: "AddOrder",
    component: Add,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
