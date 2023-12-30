// recipe-list.component.ts
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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

  constructor(private recipeService: RecipeService) {}

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
}
