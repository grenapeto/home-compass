import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://aragorn:3000/api/v1/recipes';

  getAllRecipes(){
    return this.http.get(`${this.apiUrl}`)
  }

  postNewRecipe(title: string, ingredients: [string], instructions: [string]): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { title, ingredients, instructions })
  }

  getSingleRecipe(recipeId: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${recipeId}`)
  }
updateSingleRecipe(id: string, title: string, ingredients: [string], instructions: [string]): Observable<any>{
  return this.http.put(`${this.apiUrl}/${id}`, { title, ingredients, instructions })
}


deleteSingleRecipe(id: string): Observable<any>{
  return this.http.delete(`${this.apiUrl}/${id}`)
}
}

