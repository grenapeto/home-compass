import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl;

getAllIngredients(){
 return this.http.get(`${this.apiUrl}/ingredients`)
}

createNewIngredient(name: string): Observable<any>{
  return this.http.post(`${this.apiUrl}/ingredients`, name)
}

getSingleIngredient(recipeId:string ){
  return this.http.get(`${this.apiUrl}/ingredients/${recipeId}`)
}

updateIngredient(ingredientId: string, name: string): Observable<any>{
return this.http.put(`${this.apiUrl}/ingredients/${ingredientId}`, name)
}

deleteIngredient(ingredientId: string) {
  return this.http.delete(`${this.apiUrl}/ingredients/${ingredientId}`)
}
}


