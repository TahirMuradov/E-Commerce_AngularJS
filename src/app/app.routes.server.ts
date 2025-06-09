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
  { path: 'dashboard/category/edit/:Id', renderMode: RenderMode.Client },
  { path: 'dashboard/category/create', renderMode: RenderMode.Client },

  { path: 'dashboard/products/:page', renderMode: RenderMode.Client },
  { path: 'dashboard/product/edit/:Id', renderMode: RenderMode.Client },
  { path: 'dashboard/product/create', renderMode: RenderMode.Client },

  { path: 'dashboard/sizes/:page', renderMode: RenderMode.Client },
  { path: 'dashboard/size/edit/:Id', renderMode: RenderMode.Client },
  { path: 'dashboard/size/create', renderMode: RenderMode.Client },

    { path: 'dashboard/discountareas/:page', renderMode: RenderMode.Client },
  { path: 'dashboard/discountarea/edit/:Id', renderMode: RenderMode.Client },
  { path: 'dashboard/discountarea/create', renderMode: RenderMode.Client },



  // Wildcard
  { path: '**', renderMode: RenderMode.Client },
];
