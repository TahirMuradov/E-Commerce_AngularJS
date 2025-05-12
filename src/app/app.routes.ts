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


export const routes: Routes = [
    {
        path: "", component: LayoutComponent, children: [
            { path: "", component: HomeComponent },
          { path: "home", component: HomeComponent },
          { path: "about", component: AboutComponent },
          { path: "auth/login", component: LoginComponent },
          { path: "auth/register", component: RegisterComponent },
          { path: "auth/forgotpassword", component: ForgotpasswordComponent },
          { path: "shop/:page", component: ShopComponent },
          { path: "productdetail/:id", component: ProductDetailComponent },
          { path: "cartdetail", component: CartDetailComponent },
          { path: "contact", component: ContactComponent },
          { path: '**', component: NotFoundComponent },
        ]
      },
      {
        path: "dashboard", component: DashboardLayoutComponent, children: [
           
          { path: "users", component: UsertableComponent },
          { path: "user/:Id", component: UserUpdateComponent },

          { path: "categories", component: CategoryTableComponent },
          { path: "category/:Id", component: CategoryUpdateComponent },
          { path: "categorycreate", component: CategoryCreateComponent },

          { path: "products", component: ProductTableComponent },
          { path: "product/:Id", component: ProductUpdateComponent, },
          { path: "productcreate", component: ProductCreateComponent },

          { path: "sizes", component: SizeTableComponent },
          { path: "sizecreate", component: SizeCreateComponent },
          { path: "size/:Id", component: SizeUpdateComponent },
          { path: '**', component: NotFoundComponent },
        ]
      },
    { path: '**', component: NotFoundComponent },
];

  