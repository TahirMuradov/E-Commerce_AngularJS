import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Main Layout Routes
  { path: '', renderMode: RenderMode.Server },
  { path: 'home', renderMode: RenderMode.Server },
  { path: 'about', renderMode: RenderMode.Server },
  { path: 'contact', renderMode: RenderMode.Server },
  { path: 'shop/:page', renderMode: RenderMode.Server },
  { path: 'productdetail/:id', renderMode: RenderMode.Server },
  { path: 'auth/forgotpassword', renderMode: RenderMode.Server },
  { path: 'cartdetail', renderMode: RenderMode.Server },

  // Auth
  { path: 'auth/login', renderMode: RenderMode.Server },
  { path: 'auth/register', renderMode: RenderMode.Server },
  { path: 'auth/forgotpassword', renderMode: RenderMode.Server },

  // Dashboard (Child routes of DashboardLayoutComponent)
  { path: 'dashboard', renderMode: RenderMode.Client }, // parent
  { path: 'dashboard/users', renderMode: RenderMode.Client },
  { path: 'dashboard/user/:Id', renderMode: RenderMode.Client },

  { path: 'dashboard/categories/:page', renderMode: RenderMode.Client },
  { path: 'dashboard/category/:Id', renderMode: RenderMode.Client },
  { path: 'dashboard/categorycreate', renderMode: RenderMode.Client },

  { path: 'dashboard/products', renderMode: RenderMode.Client },
  { path: 'dashboard/product/:Id', renderMode: RenderMode.Client },
  { path: 'dashboard/productcreate', renderMode: RenderMode.Client },

  { path: 'dashboard/sizes', renderMode: RenderMode.Client },
  { path: 'dashboard/size/:Id', renderMode: RenderMode.Client },
  { path: 'dashboard/sizecreate', renderMode: RenderMode.Client },




  // Wildcard
  { path: '**', renderMode: RenderMode.Client },
];
