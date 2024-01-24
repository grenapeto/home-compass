import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddItemsComponent } from './inventory/add-items/add-items.component';

import { TuiRootModule, TuiDialogModule, TuiAlertModule, TuiNotificationModule } from "@taiga-ui/core";
import {TuiInputModule, TuiInputNumberModule, TuiSelectModule  } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import {TuiTableModule} from '@taiga-ui/addon-table';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
      BrowserAnimationsModule,
      TuiRootModule,
      TuiDialogModule,
      TuiAlertModule,
      TuiInputModule,
      FormsModule,
      ReactiveFormsModule,
      TuiButtonModule,
      TuiInputNumberModule,
      TuiSelectModule,
      TuiNotificationModule,
      TuiTableModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
