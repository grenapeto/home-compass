import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:3000'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  requestPasswordReset(email: any) {
    return this.http.post(`${this.baseUrl}/password-reset`, email);
  }

  resetPassword(token: string, newPassword: any) {
    return this.http.post(`${this.baseUrl}/password-reset/${token}`, newPassword);
  }
}
