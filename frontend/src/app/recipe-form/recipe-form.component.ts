import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  selectedIngredients: any[] = [];

  constructor(private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      name: [''],
      ingredients: this.fb.array([]),
      instructions: [''],
      cookTime: [''],
      portions: [''],
      picture: [''],
      ingredientsAdded: this.fb.array([]),
    });
  }

  ngOnInit() {
    // Initialize the first ingredient field
    this.addIngredient();
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    // Add a new ingredient to the form array
    this.ingredients.push(
      this.fb.group({
        name: [''],
        amount: [''],
        unit: [''],
      })
    );
  }

  removeIngredient(index: number) {
    // Remove the ingredient at the specified index
    this.ingredients.removeAt(index);
  }

  addIngredientToForm(index: number): void {
    const selectedIngredient = this.ingredients.at(index).value;

    const addedIngredients = this.recipeForm.get('ingredientsAdded') as FormArray;
    addedIngredients.push(this.fb.group({
      name: [selectedIngredient.name],
      amount: [selectedIngredient.amount],
      unit: [selectedIngredient.unit],
    }));

    // Optional: Clear the fields to start fresh
    this.ingredients.at(index).reset();

    // You can add more logic here if needed
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    // Add logic here to handle form submission
  }
}
