import { RouteConfig } from "vue-router";

const routes: RouteConfig[] = [
  {
    path: "/",
    component: ():Promise<typeof import("*.vue")> => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: ():Promise<typeof import("*.vue")> => import("pages/Index.vue") }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: ():Promise<typeof import("*.vue")> => import("pages/Error404.vue")
  }
];

export default routes;
