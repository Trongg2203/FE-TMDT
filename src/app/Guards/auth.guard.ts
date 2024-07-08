import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (authService.isLoggedIn()) {
    // user is logged in and can not be use login page
    return true;
  }
  toastr.error('Bạn phải đăng nhập !!', 'Lỗi', { timeOut: 3000 });
  // router.navigate(['/']);

  return false;
};
