import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { store } from "../store";
const routes: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/Home",
    component: () => import("../pages/index/index.vue"),
  },
  {
    name: "List",
    path: "/List",
    props: r => ({ type: r.query.type }),
    component: () => import("../pages/list/index.vue"),
  },
  {
    name: "Singer",
    path: "/Singer",
    props: r => ({ type: r.query.type, id: r.query.id }),
    component: () => import("../pages/list/index.vue"),
  },

  {
    name: `Play`,
    path: "/Play",
    props: r => ({ songId: r.query.songId }),
    component: () => import("../pages/Play/index.vue"),
    meta: {
      keepAlive: true,
    },
  },
  {
    name: "Search",
    path: "/Search/:type?",
    props: r => ({ type: r.query.type, store: r.query.s }),
    component: () => import("../pages/search/index.vue"),
    children: [
      {
        path: "search_all",
        component: () => import("../pages/search/search_all.vue"),
      },
      {
        path: "search_list/limit=:limit",
        props: r => ({ limit: r.params.limit }),
        component: () => import("../pages/search/search_list.vue"),
      },
    ],
  },
  {
    name: "User",
    path: "/User/:id",
    props: r => ({ id: r.params.id }),
    component: () => import("../pages/user/index.vue"),
    children: [
      {
        path: "Settings",
        component: () => import("../pages/setting/index.vue"),
      },
      {
        path: "userInfo",
        component: () => import("../pages/user/userInfo.vue"),
      },
    ],
  },
  {
    redirect: "/Home",
    path: "/",
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { top: 0 };
  },
});
// router.beforeEach(async (to, from) => {
//   const s = store();
//   if (to.path == "/Play" || from.path == "/Play") {
//     if (to.path == "/Play" && from.path == "/Play") {
//       return;
//     } else {
//        s.chageShowFooterType();
//     }
//   }
// });
export default router;
