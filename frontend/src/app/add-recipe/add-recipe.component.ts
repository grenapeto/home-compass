import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  addRecipeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipesService
  ) {
    this.addRecipeForm = this.fb.group({
      title: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      // recipes: this.fb.array([]), // If you have an array of recipes
    });
  }

  ngOnInit(): void {}

  postNewRecipe(): void {
    const { title, ingredients, instructions } = this.addRecipeForm.value;
    
    this.recipeService.postNewRecipe(title, ingredients, instructions)
      .subscribe(
        (response) => {
          console.log('Recipe added successfully', response);
          // Additional success handling
        },
        (error) => {
          console.error('Error adding recipe', error);
          // Additional error handling
        }
      );
  }
}