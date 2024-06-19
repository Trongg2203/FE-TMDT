import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './Guards/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { CateProductComponent } from './cate-product/cate-product.component';

export const routes: Routes = [
    {path:'',component: HomeComponent},
    {path:'login',component: LoginComponent, canActivate:[authGuard]},
    {path:'Cate-product/product-details/:idHangHoa',component:ProductDetailsComponent},
    {path:'cart',component:CartComponent},
    {path:'Cate-product/:idLoaiHangHoa', component:CateProductComponent}
];
