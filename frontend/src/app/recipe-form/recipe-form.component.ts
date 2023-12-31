import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError, map, tap } from 'rxjs/operators';
import { IngredientService } from '../services/ingredient.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  ingredientSuggestions$: Observable<any[]> = of([]);
  private searchTerms = new Subject<string>();
  selectedIngredients: any[] = [];
  currentSuggestions: any[] = [];
  
  constructor(private fb: FormBuilder, private ingredientService: IngredientService) {
    this.recipeForm = this.fb.group({
      name: [''],
      ingredients: this.fb.array([]),
      instructions: [''],
      cookTime: [''],
      portions: [''],
      picture: [''],
      ingredientsAdded: this.fb.array([]), // Assuming you have a separate array for added ingredients
    });
  }

  ngOnInit() {
    this.ingredientSuggestions$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => term ? this.ingredientService.getIngredients(term) : of([])),
      map(items => items.length > 0 ? items : [{ name: 'Create new ingredient' }]),
      tap(suggestions => this.currentSuggestions = suggestions),
      catchError(error => {
        console.error(error);
        return of([]);
      })
    );
  }

  search(term: string): void {
    if (term) {
      this.searchTerms.next(term);
    } else {
      this.ingredientSuggestions$ = of([]);
    }
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control(''));
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  selectSuggestion(index: number, suggestion: any) {
    // Handle selection logic
    this.selectedIngredients[index] = { name: suggestion.name, amount: '', unit: '' };
    this.addIngredientToForm(index);
  }

  onEnter(index: number): void {
    if (this.currentSuggestions.length > 0) {
      this.selectSuggestion(index, this.currentSuggestions[0]);
    }
  }

  addIngredientToForm(index: number): void {
    const selectedIngredient = this.selectedIngredients[index];

    // Add logic to handle adding ingredient to the list below the "Add Ingredient" button
    // For demonstration purposes, let's assume you have a separate array to store added ingredients
    // You may need to adapt this part based on your actual data structure and requirements
    const addedIngredients = this.recipeForm.get('ingredientsAdded') as FormArray;
    addedIngredients.push(this.fb.group({
      name: [selectedIngredient.name],
      amount: [selectedIngredient.amount],
      unit: [selectedIngredient.unit],
    }));

    // Optional: Clear the selected ingredient to start fresh
    this.selectedIngredients[index] = { name: '', amount: '', unit: '' };
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    // Add logic here to handle form submission
  }
}
