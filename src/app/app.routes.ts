import { Routes } from '@angular/router';
import { NotFoundComponent } from './ui/components/notFound/not-found/not-found.component';
import { LayoutComponent } from './ui/layouts/layout/layout.component';
import { DashboardLayoutComponent } from './ui/layouts/dashboard-layout/dashboard-layout.component';
import { HomeComponent } from './ui/components/homeComponents/home/home.component';
import { AboutComponent } from './ui/components/aboutcomponents/about/about.component';
import { ShopComponent } from './ui/components/shopcomponents/shop/shop.component';
import { UsertableComponent } from './ui/components/dashboard/user/usertable/usertable.component';
import { CategoryTableComponent } from './ui/components/dashboard/category/category-table/category-table.component';
import { UserUpdateComponent } from './ui/components/dashboard/user/user-update/user-update.component';
import { CategoryUpdateComponent } from './ui/components/dashboard/category/category-update/category-update.component';
import { ProductTableComponent } from './ui/components/dashboard/product/product-table/product-table.component';
import { ProductUpdateComponent } from './ui/components/dashboard/product/product-update/product-update.component';
import { SizeTableComponent } from './ui/components/dashboard/size/size-table/size-table.component';
import { SizeUpdateComponent } from './ui/components/dashboard/size/size-update/size-update.component';
import { CategoryCreateComponent } from './ui/components/dashboard/category/category-create/category-create.component';
import { ProductCreateComponent } from './ui/components/dashboard/product/product-create/product-create.component';
import { SizeCreateComponent } from './ui/components/dashboard/size/size-create/size-create.component';
import { ProductDetailComponent } from './ui/components/product-detail/product-detail.component';
import { CartDetailComponent } from './ui/components/cart-detail/cart-detail.component';
import { ContactComponent } from './ui/components/contact/contact.component';
import { LoginComponent } from './ui/components/auth/login/login.component';
import { ForgotpasswordComponent } from './ui/components/auth/forgotpassword/forgotpassword.component';
import { RegisterComponent } from './ui/components/auth/register/register.component';
import { authGuard } from './guards/common/auth.guard';
import { EmailConfirmationComponent } from './ui/components/auth/email-confirmation/email-confirmation.component';
import { ChangeForgotPasswordComponent } from './ui/components/auth/change-forgot-password/change-forgot-password.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Home',
        loadComponent: () =>
          import('./ui/components/homeComponents/home/home.component').then(
            (x) => x.HomeComponent
          ),
      },
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
        loadComponent: () =>
          import('./ui/components/homeComponents/home/home.component').then(
            (x) => x.HomeComponent
          ),
      },
      {
        path: 'about',
        component: AboutComponent,
        title: 'About',

        loadComponent: () =>
          import('./ui/components/aboutcomponents/about/about.component').then(
            (x) => x.AboutComponent
          ),
      },
      {
        path: 'auth/login',
        component: LoginComponent,
        canActivate: [authGuard],
        title: 'Login',
        loadComponent: () =>
          import('./ui/components/auth/login/login.component').then(
            (x) => x.LoginComponent
          ),
      },
      {
        path: 'auth/register',
        component: RegisterComponent,
        canActivate: [authGuard],
        title: 'Register',
        loadComponent: () =>
          import('./ui/components/auth/register/register.component').then(
            (x) => x.RegisterComponent
          ),
      },
      {
        path: 'auth/forgotpassword',
        component: ForgotpasswordComponent,
        canActivate: [authGuard],
        title: 'ForgotPassword',
        loadComponent: () =>
          import(
            './ui/components/auth/forgotpassword/forgotpassword.component'
          ).then((x) => x.ForgotpasswordComponent),
      },
      {
        path: 'shop/:page',
        component: ShopComponent,
        title: 'Shop',

        loadComponent: () =>
          import('./ui/components/shopcomponents/shop/shop.component').then(
            (x) => x.ShopComponent
          ),
      },
      {
        path: 'productdetail/:id',
        component: ProductDetailComponent,
        title: 'Product Detail',
        loadComponent: () =>
          import(
            './ui/components/product-detail/product-detail.component'
          ).then((x) => x.ProductDetailComponent),
      },
      {
        path: 'auth/emailconfirmed/:email/:token',
        component: EmailConfirmationComponent,
        title: 'Email Confirmation',
        loadComponent: () =>
          import(
            './ui/components/auth/email-confirmation/email-confirmation.component'
          ).then((x) => x.EmailConfirmationComponent),
      },
      {
        path: 'auth/changepasswordforforgot',
        component: ChangeForgotPasswordComponent,
        title: 'Change Password',
        loadComponent: () =>
          import(
            './ui/components/auth/change-forgot-password/change-forgot-password.component'
          ).then((x) => x.ChangeForgotPasswordComponent),
      },
      {
        path: 'cartdetail',
        component: CartDetailComponent,
        title: 'Basket Detail',
        loadComponent: () =>
          import('./ui/components/cart-detail/cart-detail.component').then(
            (x) => x.CartDetailComponent
          ),
      },
      {
        path: 'contact',
        component: ContactComponent,
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
        component: UsertableComponent,
        title: 'Users',

        loadComponent: () =>
          import(
            './ui/components/dashboard/user/usertable/usertable.component'
          ).then((x) => x.UsertableComponent),
      },
      {
        path: 'user/:Id',
        component: UserUpdateComponent,
        title: 'User Edit Profile',

        loadComponent: () =>
          import(
            './ui/components/dashboard/user/user-update/user-update.component'
          ).then((x) => x.UserUpdateComponent),
      },
      {
        path: 'categories',
        component: CategoryTableComponent,
        title: 'Categories',
        loadComponent: () =>
          import(
            './ui/components/dashboard/category/category-table/category-table.component'
          ).then((x) => x.CategoryTableComponent),
      },
      {
        path: 'category/:Id',
        component: CategoryUpdateComponent,
        title: 'Category Detail',
        loadComponent: () =>
          import(
            './ui/components/dashboard/category/category-update/category-update.component'
          ).then((x) => x.CategoryUpdateComponent),
      },
      {
        path: 'categorycreate',
        component: CategoryCreateComponent,
        title: 'Category Create',
        loadComponent: () =>
          import(
            './ui/components/dashboard/category/category-create/category-create.component'
          ).then((x) => x.CategoryCreateComponent),
      },
      {
        path: 'products',
        component: ProductTableComponent,
        title: 'Products',
        loadComponent: () =>
          import(
            './ui/components/dashboard/product/product-table/product-table.component'
          ).then((x) => x.ProductTableComponent),
      },
      {
        path: 'product/:Id',
        component: ProductUpdateComponent,
        title: 'Product Detail',
        loadComponent: () =>
          import(
            './ui/components/dashboard/product/product-update/product-update.component'
          ).then((x) => x.ProductUpdateComponent),
      },
      {
        path: 'productcreate',
        component: ProductCreateComponent,
        title: 'Product Create',
        loadComponent: () =>
          import(
            './ui/components/dashboard/product/product-create/product-create.component'
          ).then((x) => x.ProductCreateComponent),
      },
      {
        path: 'sizes',
        component: SizeTableComponent,
        title: 'Sizes',
        loadComponent: () =>
          import(
            './ui/components/dashboard/size/size-table/size-table.component'
          ).then((x) => x.SizeTableComponent),
      },
      {
        path: 'sizecreate',
        component: SizeCreateComponent,
        title: 'Size Create',
        loadComponent: () =>
          import(
            './ui/components/dashboard/size/size-create/size-create.component'
          ).then((x) => x.SizeCreateComponent),
      },
      {
        path: 'size/:Id',
        component: SizeUpdateComponent,
        loadComponent: () =>
          import(
            './ui/components/dashboard/size/size-update/size-update.component'
          ).then((x) => x.SizeUpdateComponent),
      },
    ],
  },

  { path: '**', component: NotFoundComponent, title: 'Not Found Page' },
];
