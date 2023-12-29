import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
import { RecipeRoutingModule } from './recipe-routing.module';

@NgModule({
  declarations: [RecipeListComponent],
  imports: [
    CommonModule,
    RecipeRoutingModule
  ]
})
export class RecipeModule { }
