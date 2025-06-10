import { Routes } from '@angular/router';
import { NotFoundComponent } from './ui/components/notFound/not-found/not-found.component';
import { LayoutComponent } from './ui/layouts/layout/layout.component';
import { DashboardLayoutComponent } from './ui/layouts/dashboard-layout/dashboard-layout.component';
import { authGuard } from './guards/common/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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
      {
        path: 'about',
   
        title: 'About',

        loadComponent: () =>
          import('./ui/components/aboutcomponents/about/about.component').then(
            (x) => x.AboutComponent
          ),
      },
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
        path: 'shop/:page',
      
        title: 'Shop',

        loadComponent: () =>
          import('./ui/components/shopcomponents/shop/shop.component').then(
            (x) => x.ShopComponent
          ),
      },
      {
        path: 'productdetail/:id',
    
        title: 'Product Detail',
        loadComponent: () =>
          import(
            './ui/components/product-detail/product-detail.component'
          ).then((x) => x.ProductDetailComponent),
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
      {
        path: 'cartdetail',
 
        title: 'Basket Detail',
        loadComponent: () =>
          import('./ui/components/cart-detail/cart-detail.component').then(
            (x) => x.CartDetailComponent
          ),
      },
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
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'users',
       
        title: 'Users',

        loadComponent: () =>
          import(
            './ui/components/dashboard/user/usertable/usertable.component'
          ).then((x) => x.UsertableComponent),
      },
      {
        path: 'user/:Id',
   
        title: 'User Edit Profile',

        loadComponent: () =>
          import(
            './ui/components/dashboard/user/user-update/user-update.component'
          ).then((x) => x.UserUpdateComponent),
      },
      {
        path: 'categories/:page',
    
        title: 'Categories',
        loadComponent: () =>
          import(
            './ui/components/dashboard/category/category-table/category-table.component'
          ).then((x) => x.CategoryTableComponent),
      },
      {
        path: 'category/edit/:Id',

        title: 'Category Edit',
        loadComponent: () =>
          import(
            './ui/components/dashboard/category/category-update/category-update.component'
          ).then((x) => x.CategoryUpdateComponent),
      },
      {
        path: 'category/create',
      
        title: 'Category Create',
        loadComponent: () =>
          import(
            './ui/components/dashboard/category/category-create/category-create.component'
          ).then((x) => x.CategoryCreateComponent),
      },
            {
        path: 'product/create',
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
        title: 'Product Update',
        loadComponent: () =>
          import(
            './ui/components/dashboard/product/product-update/product-update.component'
          ).then((x) => x.ProductUpdateComponent),
      },

      {
        path: 'sizes/:page',
        title: 'Sizes',
        loadComponent: () =>
          import(
            './ui/components/dashboard/size/size-table/size-table.component'
          ).then((x) => x.SizeTableComponent),
      },
      {
        path: 'size/create',
        title: 'Size Create',
        loadComponent: () =>
          import(
            './ui/components/dashboard/size/size-create/size-create.component'
          ).then((x) => x.SizeCreateComponent),
      },
      {
        path: 'size/edit/:Id',
        loadComponent: () =>
          import(
            './ui/components/dashboard/size/size-update/size-update.component'
          ).then((x) => x.SizeUpdateComponent),
      },
         {
        path: 'discountarea/edit/:Id',
        loadComponent: () =>
          import(
            './ui/components/dashboard/DisCountArea/dis-count-area-update/dis-count-area-update.component'
          ).then((x) => x.DisCountAreaUpdateComponent),
      },
         {
        path: 'discountareas/:page',
        loadComponent: () =>
          import(
            './ui/components/dashboard/DisCountArea/dis-count-area-table/dis-count-area-table.component'
          ).then((x) => x.DisCountAreaTableComponent),
      },
         {
        path: 'discountarea/create',
        loadComponent: () =>
          import(
            './ui/components/dashboard/DisCountArea/dis-count-area-create/dis-count-area-create.component'
          ).then((x) => x.DisCountAreaCreateComponent),
      },
       {
        path: 'homeslideritem/create',
        loadComponent: () =>
          import(
            './ui/components/dashboard/homesliderItem/home-slider-item-create/home-slider-item-create.component'
          ).then((x) => x.HomeSliderItemCreateComponent),
      },
           {
        path: 'homeslideritems/:page',
        loadComponent: () =>
          import(
            './ui/components/dashboard/homesliderItem/home-slider-item-table/home-slider-item-table.component'
          ).then((x) => x.HomeSliderItemTableComponent),
      },   {
        path: 'homeslideritem/edit/:id',
        loadComponent: () =>
          import(
            './ui/components/dashboard/homesliderItem/home-slider-item-update/home-slider-item-update.component'
          ).then((x) => x.HomeSliderItemUpdateComponent),
      },
             {
        path: 'topcategoryarea/create',
        loadComponent: () =>
          import(
            './ui/components/dashboard/TopCategoryArea/top-category-area-create/top-category-area-create.component'
          ).then((x) => x.TopCategoryAreaCreateComponent),
      },
           {
        path: 'topcategoryareas/:page',
        loadComponent: () =>
          import(
            './ui/components/dashboard/TopCategoryArea/top-category-area-table/top-category-area-table.component'
          ).then((x) => x.TopCategoryAreaTableComponent),
      },   {
        path: 'topcategoryarea/edit/:id',
        loadComponent: () =>
          import(
            './ui/components/dashboard/TopCategoryArea/top-category-area-update/top-category-area-update.component'
          ).then((x) => x.TopCategoryAreaUpdateComponent),
      },
    ],
  },

  { path: '**', component: NotFoundComponent, title: 'Not Found Page' },
];
