import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Observable } from 'rxjs';
import {TuiFileLike} from '@taiga-ui/kit';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  addRecipeForm: FormGroup;
  file!: TuiFileLike; // Removed 'readonly' to allow modification

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipesService
  ) {
    this.addRecipeForm = this.fb.group({
      title: ['', Validators.required],
      cooktime: ['', Validators.required],
      portions: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      image: ['']
      // ... other form controls
    });

    // Subscribe to changes in the image form control
    this.addRecipeForm.get('image')?.valueChanges.subscribe(files => {
      if (files.length > 0) {
        // Handle file selection. Example: Log the name of the first file
        console.log("Selected file:", files[0].name);
        // Add any additional handling here
      }
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
