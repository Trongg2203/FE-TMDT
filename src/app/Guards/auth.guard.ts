import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); 
  const router = inject(Router);

  if(authService.isLoggedIn()){
    // user is logged in and can not be use login page
    router.navigate(['/'])
    return false;
  }



  return true;
};
