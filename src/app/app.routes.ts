import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
    {path:'',component: HomeComponent},
    {path:'login',component: LoginComponent, canActivate:[authGuard]},
    {path:'product-details/:idHangHoa',component:ProductDetailsComponent}
];
