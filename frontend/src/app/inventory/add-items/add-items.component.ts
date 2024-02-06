import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import {
  InventoryService,
  InventoryItem,
  SubItem,
} from '../../services/inventory.service';
import { HttpClient } from '@angular/common/http';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css'],
})
export class AddItemsComponent {
  readonly columns = ['name', 'quantity', 'category', 'expirationDate'];
  inventoryItems: InventoryItem[] = [];
  addItemsForm: FormGroup;
  expirationDateControls: FormGroup[] = [];
  expirationDates: TuiDay[] = [];
  isBarcodeScannerVisible: boolean = false; // New Property

  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private inventoryService: InventoryService,
  ) {
    this.addItemsForm = this.fb.group({
      barcode: [''], // Provide a default value
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
    });

    this.addItemsForm.get('quantity')?.valueChanges.subscribe((value) => {
      this.updateExpirationDates(value);
    });

    // Listen for changes in the barcode field after 10 characters
    this.addItemsForm.get('barcode')?.valueChanges.subscribe((barcode) => {
      if (barcode && barcode.length >= 10) {
        this.searchProductByBarcode(barcode);
      }
    });
  }

  updateBarcodeField(scannedBarcode: string): void {
    this.addItemsForm.get('barcode')?.setValue(scannedBarcode);
  }

  searchProductByBarcode(barcode: string): void {
    if (barcode.length >= 13) {
      const apiEndpoint = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`;

      this.httpClient.get(apiEndpoint).subscribe(
        (response: any) => {
          if (response.status === 1) {
            const product = response.product;
            this.addItemsForm.get('name')?.setValue(product.product_name);

            // Remove the "en:" prefix from the category
            const category = product.categories_hierarchy[0];
            if (category.startsWith('en:')) {
              this.addItemsForm.get('category')?.setValue(category.substr(3));
            } else {
              this.addItemsForm.get('category')?.setValue(category);
            }
          } else {
            console.error('Product not found');
          }
        },
        (error) => {
          console.error('Error fetching product data:', error);
          // Handle the error as needed
        }
      );
    }
  }

  addItem(): void {
    if (this.addItemsForm.valid) {
      const subItems: SubItem[] = this.expirationDates.map(
        (dateControl, index) => ({
          expirationDate: new Date(
            dateControl.day,
            dateControl.month,
            dateControl.year
          ), // Convert TuiDay to JavaScript Date
          amount: 1, // Assuming each subitem is counted as 1 unit
          // Add 'unit' if necessary
        })
      );

      const newItem: InventoryItem = {
        name: this.addItemsForm.value.name,
        items: subItems,
        category: this.addItemsForm.value.category,
        barcode: this.addItemsForm.value.barcode,
      };

      this.inventoryService.createInventoryItem(newItem).subscribe(
        (response) => {
          console.log('Item added successfully', response);
        },
        (error) => {
          console.error('Error adding item:', error);
          // Display the error to the user
        }
      );

      this.addItemsForm.reset();
      this.expirationDates = [];
    }
  }

  updateExpirationDates(quantity: number): void {
    // Clear the existing expirationDates array
    this.expirationDates = [];

    // Generate a unique expiration date for each item
    for (let i = 0; i < quantity; i++) {
      // Calculate a new expiration date, e.g., one day from today for each item
      const expirationDate = new TuiDay(2023, 0, 15).append({ day: i });

      // Push the generated expiration date to the array
      this.expirationDates.push(expirationDate);
    }
  }
}
