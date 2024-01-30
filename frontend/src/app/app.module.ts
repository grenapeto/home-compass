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

import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiNotificationModule,
} from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiInputNumberModule,
  TuiSelectModule,
} from '@taiga-ui/kit';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiDataListModule } from '@taiga-ui/core';
import { TuiComboBoxModule, TuiDataListWrapperModule } from '@taiga-ui/kit';
import { TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';
import { TuiInputDateModule } from '@taiga-ui/kit';
import { TuiTilesModule } from '@taiga-ui/kit';
import { TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';

import { BarcodeScannerLivestreamModule } from "ngx-barcode-scanner";
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BarcodeScannerComponent,
    AddItemsComponent,
    DashboardComponent,
    NavbarComponent,
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
    BarcodeScannerLivestreamModule,
    
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
