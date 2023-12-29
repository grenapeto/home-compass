import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:3000/api/recipes'; // Adjust according to your backend URL

  constructor(private http: HttpClient) { }

  getAllRecipes() {
    return this.http.get(this.apiUrl);
  }

  // Add other methods for creating, updating, and deleting recipes
}
