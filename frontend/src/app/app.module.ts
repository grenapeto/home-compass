import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';
import { AccountService } from './_services';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';


// angular material
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddProductComponent } from './add-product/add-product.component';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import { RecipeDetailEditComponent } from './recipe-detail-edit/recipe-detail-edit.component';
import { RecipeListEditComponent } from './recipe-list-edit/recipe-list-edit.component';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatButtonModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatDialogModule
      ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        RecipeFormComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        AddProductComponent,
        BarcodeScannerComponent,
        InventoryListComponent,
        InventoryDetailComponent,
        RecipeDetailEditComponent,
        RecipeListEditComponent,
        
    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }