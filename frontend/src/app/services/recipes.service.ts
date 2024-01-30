import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl;

  getAllRecipes(){
    return this.http.get(`${this.apiUrl}/recipes`)
  }

  postNewRecipe(title: string, ingredients: [string], instructions: [string]): Observable<any> {
    return this.http.post(`${this.apiUrl}/recipes`, { title, ingredients, instructions })
  }

  getSingleRecipe(recipeId: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${recipeId}`)
  }
updateSingleRecipe(id: string, title: string, ingredients: [string], instructions: [string]): Observable<any>{
  return this.http.put(`${this.apiUrl}/recipes/${id}`, { title, ingredients, instructions })
}


deleteSingleRecipe(id: string): Observable<any>{
  return this.http.delete(`${this.apiUrl}/recipes/${id}`)
}
}

