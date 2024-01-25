import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { InventoryService, InventoryItem, SubItem } from '../../services/inventory.service';
import {TuiDay} from '@taiga-ui/cdk';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css'],
})
export class AddItemsComponent {
  readonly columns = ['name', 'quantity', 'category', 'expirationDate'];
  inventoryItems: InventoryItem[] = [];
  addItemsForm: FormGroup;
  expirationDates: FormControl[] = [];

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService
  ) {
    this.addItemsForm = this.fb.group({
      barcode: [''], // Assuming no specific validation for barcode
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
    });

    this.addItemsForm.get('quantity')?.valueChanges.subscribe((value) => {
      this.updateExpirationDates(value);
    });
  }

  addItem(): void {
    if (
      this.addItemsForm.valid &&
      this.expirationDates.every((dateControl) => dateControl.valid)
    ) {
      const subItems: SubItem[] = this.expirationDates.map(
        (dateControl, index) => ({
          expirationDate: dateControl.value.date,
          amount: 1, // Assuming each subitem is counted as 1 unit
          // Add 'unit' if necessary
        })
      );

      const newItem: InventoryItem = {
        name: this.addItemsForm.value.name,
        items: subItems,
        category: this.addItemsForm.value.category,
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
    this.expirationDates = Array.from({ length: quantity }, () =>
      new FormControl('', Validators.required)
    );
  }
}
