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

  updateDatabase()
}