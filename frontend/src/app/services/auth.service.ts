import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    // Check if a token exists in Local Storage during initialization
    const token = localStorage.getItem('authToken');
    if (token) {
      this.setToken(token);
    }
  }

  private token: string | null = null;
  private apiUrl = environment.apiUrl;

  registerUser(
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      username,
      email,
      password,
    });
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Implement logout method to clear token and log the user out
  logout(): void {
    localStorage.removeItem('authToken');
    this.token = null;
    // Optionally, send a request to your server to invalidate the token
  }

  // Getter to retrieve the token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Setter to set the token (called after successful login)
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.token = token;
  }
}
