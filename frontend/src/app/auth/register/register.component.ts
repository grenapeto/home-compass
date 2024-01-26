import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  registerForm = new FormGroup({
    nameInput: new FormControl('', Validators.required),
    usernameInput: new FormControl('', Validators.required),
    emailInput: new FormControl('', [Validators.required, Validators.email]),
    passwordInput: new FormControl('', Validators.required),
    repeatPasswordInput: new FormControl('', Validators.required),
  });

  successNotification = false;
  errorNotification = false;

  register(): void {
    
    // Mark all form controls as touched to trigger validation messages
    for (const controlName in this.registerForm.controls) {
      if (this.registerForm.controls.hasOwnProperty(controlName)) {
        this.registerForm.get(controlName)?.markAsTouched();
      }
    }

    if (this.registerForm.valid) {
      const username = this.registerForm.get('usernameInput')?.value ?? '';
      const email = this.registerForm.get('emailInput')?.value ?? '';
      const password = this.registerForm.get('passwordInput')?.value ?? '';

      this.authService.registerUser(username, email, password).subscribe(
        (response) => {
          // Handle successful registration here (e.g., show a success message)
          console.log('Registration successful', response);
          this.successNotification = true;
          timer(1000)
            .pipe(
              take(1) // Optionally, take only one emission
            )
            .subscribe(() => {
              this.router.navigate(['/login']);
            });
        },
        (error) => {
          // Handle registration error here (e.g., show an error message)
          console.error('Registration failed', error);
          this.errorNotification = true;
        }
      );
    }
  }
}
