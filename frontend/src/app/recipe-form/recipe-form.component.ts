import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { RecipeService } from '@app/services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private router: Router) {
    // Initialize the form group with all necessary form controls
    this.recipeForm = this.fb.group({
      name: [''], // Recipe name
      ingredients: this.fb.array([]), // Ingredients form array
      instructions: [''], // Cooking instructions
      cookTime: [''], // Cooking time
      portions: [''], // Number of portions
      picture: [''], // Recipe picture
      ingredientsAdded: this.fb.array([]), // Array for added ingredients
    });
  }

  ngOnInit(): void {
    this.addIngredient(); // Initialize with one ingredient field
  }

  // Getter for ingredients form array
  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  // Method to add an ingredient to the form array
  addIngredient(): void {
    const uniqueId = new Date().getTime();
    this.ingredients.push(
      this.fb.group({
        id: [uniqueId],
        name: [''],
        amount: [''],
        unit: [''],
      })
    );
  }

  // Method to remove an ingredient from the form array
  removeIngredientById(index: number): void {
    const addedIngredientsById = this.recipeForm.get('ingredientsAdded') as FormArray;
    if (index >= 0 && index < addedIngredientsById.length) {
      addedIngredientsById.removeAt(index);
    }
  }

  // Method to add an ingredient to the 'ingredientsAdded' array
  addIngredientToForm(index: number): void {
    const selectedIngredient = this.ingredients.at(index).value;
    const addedIngredients = this.recipeForm.get('ingredientsAdded') as FormArray;
    addedIngredients.push(this.fb.group({
      index: [index],
      name: [selectedIngredient.name],
      amount: [selectedIngredient.amount],
      unit: [selectedIngredient.unit],
    }));

    // Optional: Clear the ingredient fields after adding
    this.ingredients.at(index).reset();

  }

  // Method to handle form submission
  onSubmit(): void {
    console.log('Form Submitted:', this.recipeForm.value);
    // Add your submission logic here
    this.recipeService.addNewRecipe(this.recipeForm.value).subscribe(
      response => {
        console.log("Recipe added successfully", response);
        this.router.navigate(['/recipes']);
      },
      error => {
        console.log("Error adding recipe", error)
      }
    )
  }
}
