import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  private apiUrl = 'http://localhost:3000/api/ingredients'; // Adjust to your API endpoint

  constructor(private http: HttpClient) { }

  getIngredients(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?search=${query}`);
  }

  addIngredient(ingredient: any): Observable<any> {
    return this.http.post(this.apiUrl, ingredient);
  }
}
