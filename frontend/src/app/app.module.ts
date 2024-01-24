import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddItemsComponent } from './inventory/add-items/add-items.component';



import { TuiRootModule, TuiDialogModule, TuiAlertModule, TuiNotificationModule } from "@taiga-ui/core";
import { TuiInputModule, TuiInputNumberModule, TuiSelectModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiDataListModule } from '@taiga-ui/core';
import { TuiComboBoxModule, TuiDataListWrapperModule } from '@taiga-ui/kit';
import { TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddItemsComponent,
    
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
    TuiTableModule,
    TuiDataListModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiInputPasswordModule,
    TuiLetModule,
      TuiInputPasswordModule,
      HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
