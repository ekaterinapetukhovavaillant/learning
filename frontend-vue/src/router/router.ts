import { createMemoryHistory, createRouter } from "vue-router";
import IndexView from "../view/IndexView.vue";
import RegistrationView from "../view/RegistrationView.vue";

enum Route {
  Index = "index",
  Registration = "registration",
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
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
