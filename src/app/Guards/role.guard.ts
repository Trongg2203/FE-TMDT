import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const roleGuard: CanActivateFn = (route, state) => {
  const roles = route.data['roles'] as string[];
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  const userRoles = authService.getRoles();

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    toastr.error('Bạn hãy đăng nhập', 'Lôi', { timeOut: 3000 });
    return false;
  }
  if (roles.some((role) => userRoles?.includes(role))) return true;

  router.navigate(['/']);
  toastr.error('Bạn không có quyền truy cập vào trang này', 'Lỗi', {
    timeOut: 3000,
  });
  return false;
};
