/* eslint-disable no-undef */
import { createRouter, createWebHistory } from "vue-router";
import LayoutView from "../layout/base.vue";
import ConversationLayoutView from "../layout/conversation.vue";
import PagesView from "../../ui/views/pages.vue";
import ConversationView from "../../ui/views/conversation.vue";

const routes = [
  {
    path: "/",
    name: "layout",
    component: LayoutView,
    children: [
      {
        path: "/",
        name: "pages",
        component: PagesView,
      },
    ],
  },

  {
    path: "/conversation/:id",
    name: "conversationlayout",
    component: ConversationLayoutView,
    children: [
      {
        path: "/conversation/:id",
        name: "conversation",
        component: ConversationView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition);
        } else {
          resolve({ left: 0, top: 0 });
        }
      }, 100);
    });
  },
});

export default router;
