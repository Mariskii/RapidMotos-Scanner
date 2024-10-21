import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const hasTokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let canAccess = false;
  const token = localStorage.getItem('accessToken');

  if(!token) {
    canAccess = true;
  } else {
    router.navigate(['/home']);
  }

  return canAccess;
};
