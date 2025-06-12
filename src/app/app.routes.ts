import { Routes } from '@angular/router';
import { NotFoundComponent } from './ui/components/notFound/not-found/not-found.component';
import { LayoutComponent } from './ui/layouts/layout/layout.component';
import { DashboardLayoutComponent } from './ui/layouts/dashboard-layout/dashboard-layout.component';
import { authGuard } from './guards/common/auth.guard';

export const routes: Routes = [
  // Main Layout routes
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Home routes
      {
        path: '',
        title: 'Home',
        loadComponent: () =>
          import('./ui/components/homeComponents/home/home.component').then(
            (x) => x.HomeComponent
          ),
      },
      {
        path: 'home',
        title: 'Home',
        loadComponent: () =>
          import('./ui/components/homeComponents/home/home.component').then(
            (x) => x.HomeComponent
          ),
      },

      // About routes
      {
        path: 'about',
        title: 'About',
        loadComponent: () =>
          import('./ui/components/aboutcomponents/about/about.component').then(
            (x) => x.AboutComponent
          ),
      },

      // Authentication routes
      {
        path: 'auth/login',
        canActivate: [authGuard],
        title: 'Login',
        loadComponent: () =>
          import('./ui/components/auth/login/login.component').then(
            (x) => x.LoginComponent
          ),
      },
      {
        path: 'auth/register',
        canActivate: [authGuard],
        title: 'Register',
        loadComponent: () =>
          import('./ui/components/auth/register/register.component').then(
            (x) => x.RegisterComponent
          ),
      },
      {
        path: 'auth/forgotpassword',
        canActivate: [authGuard],
        title: 'ForgotPassword',
        loadComponent: () =>
          import(
            './ui/components/auth/forgotpassword/forgotpassword.component'
          ).then((x) => x.ForgotpasswordComponent),
      },
      {
        path: 'auth/emailconfirmed/:email/:token',
        title: 'Email Confirmation',
        loadComponent: () =>
          import(
            './ui/components/auth/email-confirmation/email-confirmation.component'
          ).then((x) => x.EmailConfirmationComponent),
      },
      {
        path: 'auth/changepasswordforforgot',
        title: 'Change Password',
        loadComponent: () =>
          import(
            './ui/components/auth/change-forgot-password/change-forgot-password.component'
          ).then((x) => x.ChangeForgotPasswordComponent),
      },

      // Shop routes
      {
        path: 'shop/:page',
        title: 'Shop',
        loadComponent: () =>
          import('./ui/components/shopcomponents/shop/shop.component').then(
            (x) => x.ShopComponent
          ),
      },

      // Product Detail route
      {
        path: 'productdetail/:id',
        title: 'Product Detail',
        loadComponent: () =>
          import(
            './ui/components/product-detail/product-detail.component'
          ).then((x) => x.ProductDetailComponent),
      },

      // Cart Detail route
      {
        path: 'cartdetail',
        title: 'Basket Detail',
        loadComponent: () =>
          import('./ui/components/cart-detail/cart-detail.component').then(
            (x) => x.CartDetailComponent
          ),
      },

      // Contact route
      {
        path: 'contact',
        title: 'Contact',
        loadComponent: () =>
          import('./ui/components/contact/contact.component').then(
            (x) => x.ContactComponent
          ),
      },
    ],
  },

  // Dashboard Layout routes
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      // User Components routes
      {
        path: 'users/:page',
        title: 'Users',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/user/usertable/usertable.component'
          ).then((x) => x.UsertableComponent),
      },
      {
        path: 'user/:Id',
        title: 'User Edit Profile',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/user/user-update/user-update.component'
          ).then((x) => x.UserUpdateComponent),
      },

      // Category Components routes
      {
        path: 'categories/:page',
         canActivate: [authGuard],
        title: 'Categories',
        loadComponent: () =>
          import(
            './ui/components/dashboard/category/category-table/category-table.component'
          ).then((x) => x.CategoryTableComponent),
      },
      {
        path: 'category/edit/:Id',
         canActivate: [authGuard],
        title: 'Category Edit',
        loadComponent: () =>
          import(
            './ui/components/dashboard/category/category-update/category-update.component'
          ).then((x) => x.CategoryUpdateComponent),
      },
      {
        path: 'category/create',
         canActivate: [authGuard],
        title: 'Category Create',
        loadComponent: () =>
          import(
            './ui/components/dashboard/category/category-create/category-create.component'
          ).then((x) => x.CategoryCreateComponent),
      },

      // Product Components routes
      {
        path: 'product/create',
         canActivate: [authGuard],
        title: 'Product Create',
        loadComponent: () =>
          import(
            './ui/components/dashboard/product/product-create/product-create.component'
          ).then((x) => x.ProductCreateComponent),
      },
      {
        path: 'products/:page',
        title: 'Products',
        loadComponent: () =>
          import(
            './ui/components/dashboard/product/product-table/product-table.component'
          ).then((x) => x.ProductTableComponent),
      },
      {
        path: 'product/edit/:Id',
         canActivate: [authGuard],
        title: 'Product Update',
        loadComponent: () =>
          import(
            './ui/components/dashboard/product/product-update/product-update.component'
          ).then((x) => x.ProductUpdateComponent),
      },

      // Size Components routes
      {
        path: 'sizes/:page',
         canActivate: [authGuard],
        title: 'Sizes',
        loadComponent: () =>
          import(
            './ui/components/dashboard/size/size-table/size-table.component'
          ).then((x) => x.SizeTableComponent),
      },
      {
        path: 'size/create',
         canActivate: [authGuard],
        title: 'Size Create',
        loadComponent: () =>
          import(
            './ui/components/dashboard/size/size-create/size-create.component'
          ).then((x) => x.SizeCreateComponent),
      },
      {
        path: 'size/edit/:Id',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/size/size-update/size-update.component'
          ).then((x) => x.SizeUpdateComponent),
      },

      // Discount Area Components routes
      {
        path: 'discountarea/edit/:Id',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/DisCountArea/dis-count-area-update/dis-count-area-update.component'
          ).then((x) => x.DisCountAreaUpdateComponent),
      },
      {
        path: 'discountareas/:page',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/DisCountArea/dis-count-area-table/dis-count-area-table.component'
          ).then((x) => x.DisCountAreaTableComponent),
      },
      {
        path: 'discountarea/create',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/DisCountArea/dis-count-area-create/dis-count-area-create.component'
          ).then((x) => x.DisCountAreaCreateComponent),
      },

      // Home Slider Item Components routes
      {
        path: 'homeslideritem/create',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/homesliderItem/home-slider-item-create/home-slider-item-create.component'
          ).then((x) => x.HomeSliderItemCreateComponent),
      },
      {
        path: 'homeslideritems/:page',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/homesliderItem/home-slider-item-table/home-slider-item-table.component'
          ).then((x) => x.HomeSliderItemTableComponent),
      },
      {
        path: 'homeslideritem/edit/:id',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/homesliderItem/home-slider-item-update/home-slider-item-update.component'
          ).then((x) => x.HomeSliderItemUpdateComponent),
      },

      // Top Category Area Components routes
      {
        path: 'topcategoryarea/create',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/TopCategoryArea/top-category-area-create/top-category-area-create.component'
          ).then((x) => x.TopCategoryAreaCreateComponent),
      },
      {
        path: 'topcategoryareas/:page',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/TopCategoryArea/top-category-area-table/top-category-area-table.component'
          ).then((x) => x.TopCategoryAreaTableComponent),
      },
      {
        path: 'topcategoryarea/edit/:id',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/TopCategoryArea/top-category-area-update/top-category-area-update.component'
          ).then((x) => x.TopCategoryAreaUpdateComponent),
      },

      // Shipping Method Components routes
      {
        path: 'shippingmethod/edit/:id',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/shippingmethod/shipping-method-update/shipping-method-update.component'
          ).then((x) => x.ShippingMethodUpdateComponent),
      },
      {
        path: 'shippingmethod/create',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/shippingmethod/shipping-method-create/shipping-method-create.component'
          ).then((x) => x.ShippingMethodCreateComponent),
      },
      {
        path: 'shippingmethods/:page',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/shippingmethod/shipping-method-table/shipping-method-table.component'
          ).then((x) => x.ShippingMethodTableComponent),
      },

      // Payment Method Components routes
      {
        path: 'paymentmethod/edit/:id',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/paymentmethod/payment-method-update/payment-method-update.component'
          ).then((x) => x.PaymentMethodUpdateComponent),
      },
      {
        path: 'paymentmethod/create',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/paymentmethod/payment-method-create/payment-method-create.component'
          ).then((x) => x.PaymentMethodCreateComponent),
      },
      {
        path: 'paymentmethods/:page',
         canActivate: [authGuard],
        loadComponent: () =>
          import(
            './ui/components/dashboard/paymentmethod/payment-method-table/payment-method-table.component'
          ).then((x) => x.PaymentMethodTableComponent),
      },
    ],
  },

  // Not Found route
  { path: '**', component: NotFoundComponent, title: 'Not Found Page' },
];
