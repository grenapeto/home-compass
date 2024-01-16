import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:3000/api/recipes'; // Adjust according to your backend URL

  constructor(private http: HttpClient) { }

  getAllRecipes() {
    return this.http.get(this.apiUrl);
  }

  addNewRecipe(item: any) {
    return this.http.post(this.apiUrl, item);
  }

  getRecipeDetails(recipeId: string) {
    return this.http.get(`${this.apiUrl}/${recipeId}`);
  }
  // Add other methods for creating, updating, and deleting recipes


  //EDIT
  getRecipeDetailsEdit(recipeId: string) {
    return this.http.get(`${this.apiUrl}/${recipeId}`);
  }
  getAllRecipesEdit() {
    return this.http.get(this.apiUrl);
  }

  addNewRecipeEdit(item: any) {
    return this.http.post(this.apiUrl, item);
  }
  //


// New method for updating a recipe
updateRecipeDetail(recipeId: string, updatedRecipe: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${recipeId}`, updatedRecipe);
}

}
