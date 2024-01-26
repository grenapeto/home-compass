import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  loginForm = new FormGroup({
    emailInput: new FormControl(),
    passwordInput: new FormControl()
  });


  errorNotification = false;

  login(): void {
    const email = this.loginForm.get('emailInput')?.value;
    const password = this.loginForm.get('passwordInput')?.value;

    this.authService.loginUser(email, password).subscribe(
      response => {
        // Handle successful registration here (e.g., show a success message)
        console.log('Login successful', response);
          this.router.navigate(['/dashboard']);
      },
      error => {
        // Handle registration error here (e.g., show an error message)
        console.error('Login failed', error);
        this.errorNotification = true;
      }
    )
  }
  

  
}

