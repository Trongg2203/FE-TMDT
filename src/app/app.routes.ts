import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './Guards/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { CateProductComponent } from './cate-product/cate-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AccountComponent } from './components/account/account.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { roleGuard } from './Guards/role.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  {
    path: 'Cate-product/product-details/:idHangHoa',
    component: ProductDetailsComponent,
  },
  { path: 'cart', component: CartComponent },
  { path: 'Cate-product/:idLoaiHangHoa', component: CateProductComponent },
  { path: 'Checkout', component: CheckoutComponent },
  {
    path: 'Account/:idUser',
    component: AccountComponent,
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[roleGuard],
    data:{
      roles:['Admin'],
    }
  },
];
