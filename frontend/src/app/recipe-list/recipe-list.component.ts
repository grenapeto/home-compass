import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  recipes: any = [];
  pageSize = 5;
  currentPage = 0;

  constructor(private recipeService: RecipeService, public dialog: MatDialog, private router: Router) {}

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

  ngAfterViewInit(): void {
    this.initializePaginator();
  }

  initializePaginator(): void {
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
      this.paginator.pageIndex = this.currentPage;
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
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