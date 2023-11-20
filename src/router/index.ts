import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { userStore } from "@/store/User/userInfo";
import { userStatus } from "@/api";
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
    name: "Albums",
    path: "/Albums",
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
    props: r => ({ songId: r.query.songId, index: r.query.index }),
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
        name: "Search_all",
        component: () => import("../pages/search/search_all.vue"),
      },
      {
        path: "search_list",
        name: "Search_list",
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
    path: "/recommend",
    name: "recommend",
    component: () => import("../pages/recommend/index.vue"),
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
router.beforeEach(async (to, from) => {
  if (from.path == "/Play") {
    localStorage.setItem("ID", String(from.query.songId));
  }
});
router.beforeResolve(async to => {
  const s = userStore();
  const res = await userStatus();
  if (res.code == 200) {
    const { anonimousUser } = res.account;
    if (anonimousUser) {
      s.isLogin = false;
    }
  }
});
export default router;
