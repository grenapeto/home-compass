import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
private apiUrl = 'https://localhost:300/api/v1'

registerUser(username: string, email: string, password: string): Observable<any>{
  return this.http.post(`${this.apiUrl}/register`,{ username, email, password })
}


}
