import { createRouter, createWebHistory } from "vue-router";

import RegisterView from "../views/register.vue";
import LoginView from "../views/login.vue";
import CalendarView from "../views/calendar.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/calendar",
      name: "calendar",
      component: CalendarView,
    },
  ],
});

export default router;
