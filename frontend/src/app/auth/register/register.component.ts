import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
constructor(private authService: AuthService) {}

register(username: string, email: string, password: string) : void {
this.authService.registerUser(username, email, password).subscribe(
  response => {
    // Handle successful registration here (e.g., show a success message)
    console.log('Registration successful', response);
  },
  error => {
    // Handle registration error here (e.g., show an error message)
    console.error('Registration failed', error);
  }
);
}
}
