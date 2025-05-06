// app.routes.server.ts
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '', // This renders the "/" route on the client (CSR)
    renderMode: RenderMode.Client,
  },
  {
    path: 'about', // This page is static, so we prerender it (SSG)
    renderMode: RenderMode.Server,
  },
  {
    path: 'home', // This page requires user-specific data, so we use SSR
    renderMode: RenderMode.Server,
  },

  // Dynamic :Id routes rendered on client
  {
    path: 'dashboard/user/:Id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/category/:Id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/product/:Id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/size/:Id',
    renderMode: RenderMode.Client,
  },

  {
    path: '**', // All other routes will be rendered on the server (SSR)
    renderMode: RenderMode.Server,
  },
];
