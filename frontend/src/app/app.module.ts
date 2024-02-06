import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './interceptors/http-interceptor';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddItemsComponent } from './inventory/add-items/add-items.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditRecipesComponent } from './edit-recipes/edit-recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

import { TuiRootModule, TuiDialogModule, TuiAlertModule, TuiNotificationModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputNumberModule, TuiSelectModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiDataListModule } from '@taiga-ui/core';
import { TuiComboBoxModule, TuiDataListWrapperModule } from '@taiga-ui/kit';
import { TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiInputDateModule } from '@taiga-ui/kit';
import { TuiTilesModule } from '@taiga-ui/kit';
import { TuiTablePaginationModule } from '@taiga-ui/addon-table';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    EditRecipesComponent,
    AddRecipeComponent,
    AddItemsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    HttpClientModule,
    RouterModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiInputModule,
    TuiTilesModule,
    TuiButtonModule,
    TuiSvgModule,
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiInputNumberModule,
    TuiSelectModule,
    TuiNotificationModule,
    TuiTableModule,
    TuiDataListModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiInputPasswordModule,
    TuiLetModule,
    TuiInputPasswordModule,
    TuiInputDateModule,
    TuiTablePaginationModule,
    TuiTablePaginationModule,
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
