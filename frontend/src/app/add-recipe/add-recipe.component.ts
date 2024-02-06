import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
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
      ingredients: this.fb.array([this.createIngredient()]),
      instructions: this.fb.array([this.createInstruction()]),
      // recipes: this.fb.array([]), // If you have an array of recipes
    });
  }

ingredients(): FormArray {
  return this.addRecipeForm.get('ingredients') as FormArray;
}

instructions(): FormArray {
  return this.addRecipeForm.get('instructions') as FormArray;
}

createIngredient(): FormGroup {
  return this.fb.group({
    name: ['', Validators.required],
    amount: ['', Validators.required],
    unit: ['', Validators.required],
  })
}
createInstruction(): FormGroup {
  return this.fb.group({
    instructions: ['']
  })
}
addIngredient(): void {
  this.ingredients().push(this.createIngredient());
  console.log(this.ingredients())
}

addInstruction(): void {
  this.instructions().push(this.createInstruction());
  console.log(this.instructions())
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
