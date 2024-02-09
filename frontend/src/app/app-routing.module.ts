import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component';
import { AddItemsComponent } from './inventory/add-items/add-items.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { EditRecipesComponent } from './edit-recipes/edit-recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AddMealplanComponent } from './mealplans/add-mealplan/add-mealplan.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: DashboardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'add-item', component: AddItemsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-recipe', component: AddRecipeComponent },
  { path: 'edit-recipes/:id', component: EditRecipesComponent },
  { path: 'add-mealplan', component: AddMealplanComponent },
  { path: '**', redirectTo: '/home' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
