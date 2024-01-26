// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check if the user is authenticated by verifying the token
    const isAuthenticated = !!this.authService.getToken();

    console.log(`User is authenticated`, isAuthenticated)

    if (isAuthenticated) {
      console.log(`User is correctly authenticated.`)
      return true;
    } else {
      // Redirect the user to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
