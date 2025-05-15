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

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent, title: 'Home' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'about', component: AboutComponent, title: 'About' },
      { path: 'auth/login', component: LoginComponent, canActivate: [authGuard], title: 'Login' },
      { path: 'auth/register', component: RegisterComponent,canActivate:[authGuard], title: 'Register' },
      { path: 'auth/forgotpassword', component: ForgotpasswordComponent,canActivate:[authGuard], title: 'ForgotPassword' },
      { path: 'shop/:page', component: ShopComponent, title: 'Shop' },
      { path: 'productdetail/:id', component: ProductDetailComponent, title: 'Product Detail' },
      { path: 'cartdetail', component: CartDetailComponent, title: 'Basket Detail' },
      { path: 'contact', component: ContactComponent, title: 'Contact' }
    ]
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate:[authGuard],
    children: [
      { path: 'users', component: UsertableComponent },
      { path: 'user/:Id', component: UserUpdateComponent },
      { path: 'categories', component: CategoryTableComponent },
      { path: 'category/:Id', component: CategoryUpdateComponent },
      { path: 'categorycreate', component: CategoryCreateComponent },
      { path: 'products', component: ProductTableComponent },
      { path: 'product/:Id', component: ProductUpdateComponent },
      { path: 'productcreate', component: ProductCreateComponent },
      { path: 'sizes', component: SizeTableComponent },
      { path: 'sizecreate', component: SizeCreateComponent },
      { path: 'size/:Id', component: SizeUpdateComponent }
    ]
  },

  { path: '**', component: NotFoundComponent, title: 'Not Found Page' }
];
