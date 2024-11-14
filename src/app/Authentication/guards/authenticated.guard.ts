import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { inject } from '@angular/core';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
   
    const role = authService.getRoleFromToken();
    if (role === 'ADVISER') {
      router.navigate(['/dashboard/advisor']);
      return false; 
    } else if (role === 'STUDENT') {
      router.navigate(['/dashboard-student']);
      return false; 
    }
  }

  
  return true;
};