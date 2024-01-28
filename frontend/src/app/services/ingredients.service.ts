import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/api/v1/ingredients';

getAllIngredients(){
 return this.http.get(`${this.apiUrl}`)
}

createNewIngredient(name: string): Observable<any>{
  return this.http.post(`${this.apiUrl}`, name)
}

getSingleIngredient(recipeId:string ){
  return this.http.get(`${this.apiUrl}/${recipeId}`)
}

updateIngredient(ingredientId: string, name: string): Observable<any>{
return this.http.put(`${this.apiUrl}/${ingredientId}`, name)
}

deleteIngredient(ingredientId: string) {
  return this.http.delete(`${this.apiUrl}/${ingredientId}`)
}
}


