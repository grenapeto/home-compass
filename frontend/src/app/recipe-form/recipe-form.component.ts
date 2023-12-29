import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
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
  currentSuggestions: any[] = [];

  constructor(private fb: FormBuilder, private ingredientService: IngredientService) {
    this.recipeForm = this.fb.group({
      name: [''],
      ingredients: this.fb.array([]),
      instructions: [''],
      cookTime: [''],
      portions: [''],
      picture: ['']
    });
  }

  ngOnInit() {
    this.ingredientSuggestions$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => term ? this.ingredientService.getIngredients(term) : of([])),
      map(items => items.length > 0 ? items : [{ name: 'Create new ingredient' }]),
      tap(suggestions => this.currentSuggestions = suggestions), // Keep track of the current suggestions
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
      this.ingredientSuggestions$ = of([]); // Hide suggestions when input is empty
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
    if (suggestion.name === 'Create new ingredient') {
      // Logic to handle the creation of a new ingredient
      const newIngredientName = this.ingredients.at(index).value;
      this.ingredientService.addIngredient({ name: newIngredientName }).subscribe(
        addedIngredient => {
          this.ingredients.at(index).setValue(addedIngredient.name);
          this.ingredientSuggestions$ = of([]); // Hide suggestions after adding a new ingredient
        },
        error => console.error('Error adding ingredient:', error)
      );
    } else {
      this.ingredients.at(index).setValue(suggestion.name);
      this.ingredientSuggestions$ = of([]); // Hide suggestions after selection
    }
  }

  onEnter(index: number): void {
    if (this.currentSuggestions.length > 0) {
      this.selectSuggestion(index, this.currentSuggestions[0]);
    }
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    // Add logic here to handle form submission
  }
}
