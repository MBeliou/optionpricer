const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/home", component: () => import(/* webpackChunkName: "group-calculator" */ "pages/Calculator.vue") },
      { path: "/news", component: () => import(/* webpackChunkName: "group-news" */ "pages/NewsPage.vue") },
      { path: "/about", component: () => import(/* webpackChunkName: "group-about" */ "pages/AboutPage.vue") },
      { path: "/commodities", component: () => import(/* webpackChunkName: "group-commos" */ "pages/CommosPage.vue") },
      { path: "/", redirect: "/home" }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import(/* webpackChunkName: "404" */ "pages/Error404.vue")
  });
}

export default routes;
