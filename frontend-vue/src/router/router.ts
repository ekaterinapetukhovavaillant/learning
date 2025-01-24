import { createMemoryHistory, createRouter } from "vue-router";
import IndexView from "../view/IndexView.vue";
import RegistrationView from "../view/RegistrationView.vue";
import UserView from "../view/UserView.vue";
import LoginView from "../view/LoginView.vue";

enum Route {
  Index = "index",
  Registration = "registration",
  Login = "login",
  Me = "me",
}

const routes = [
  {
    path: "/",
    name: Route.Index,
    component: IndexView,
  },
  {
    path: "/registration",
    name: Route.Registration,
    component: RegistrationView,
  },
  {
    path: "/login",
    name: Route.Login,
    component: LoginView,
  },
  {
    path: "/me",
    name: Route.Me,
    component: UserView,
  },
];

const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
