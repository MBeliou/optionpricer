const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/home", component: () => import("pages/Calculator.vue") },
      { path: "/news", component: () => import("pages/NewsPage.vue") },
      { path: "/about", component: () => import("pages/AboutPage.vue") },
      { path: "/commodities", component: () => import("pages/CommosPage.vue") },
      { path: "/", redirect: "/home" }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
