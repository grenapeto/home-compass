// home.component.ts

import { Component } from '@angular/core';
import { AccountService } from '@app/_services';
import { RecipeService } from '@app/services/recipe.service';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { MatDialog } from '@angular/material/dialog';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  constructor(private accountService: AccountService, public dialog: MatDialog, private recipeService: RecipeService) { }
  recipes: any = [];
  get account() {
    return this.accountService.accountValue;
  }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe(
      (data: any) => {
        this.recipes = data;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  openDialog(recipeId: string): void {
    this.recipeService.getRecipeDetails(recipeId).subscribe(
      (details: any) => {
        const dialogRef = this.dialog.open(RecipeDetailComponent, {
          width: '800px',
          data: details,
        });
  
        dialogRef.afterClosed().subscribe((result) => {
          console.log('Dialog was closed.');
        });
      },
      (error) => {
        console.error('Error fetching recipe details!', error);
  });
  }



}
