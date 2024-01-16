import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeService } from '@app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail-edit',
  templateUrl: './recipe-detail-edit.component.html',
  styleUrls: ['./recipe-detail-edit.component.less']
})

export class RecipeDetailEditComponent {
  recipe: any; // Declare the recipe property
  editMode = false; // Add the editMode property

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recipeService: RecipeService
  ) {
    this.recipe = data; // Initialize the recipe property with the data
  }

  updateDatabase(recipeId: string, field: string, newValue: any): void {
    // Constructing the updated recipe object
    let updatedRecipe = { ...this.recipe }; // Create a copy of the current recipe
    updatedRecipe[field] = newValue; // Update the field with the new value
    console.log(updatedRecipe);
    // Calling the service to update the recipe
    this.recipeService.updateRecipeDetail(recipeId, updatedRecipe).subscribe(
      response => {
        // Handle the response, e.g., show a success message or update local data
        console.log('Update successful', response);
        this.recipe = updatedRecipe; // Update the local recipe object
      },
      error => {
        // Handle the error, e.g., show an error message
        console.error('Update failed', error);
      }
    );
  }
}