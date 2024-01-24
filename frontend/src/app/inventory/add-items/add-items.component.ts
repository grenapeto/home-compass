import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface InventoryItem {
  name: string;
  quantity: number;
  category: string;
  expirationDate: Date;
}

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})
export class AddItemsComponent {
  readonly columns = ['name', 'quantity', 'category', 'expirationDate'];
  items: InventoryItem[] = [];
  addItemsForm = this.fb.group({
    name: ['', Validators.required],
    quantity: ['', [Validators.required, Validators.min(1)]],
    category: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  addItem(): void {
    if (this.addItemsForm.valid) {
      try {
        const newItem: InventoryItem = {
          name: this.addItemsForm.value.name!,
          quantity: +this.addItemsForm.value.quantity!,
          category: this.addItemsForm.value.category!,
          expirationDate: this.calculateExpirationDate(this.addItemsForm.value.category!)
        };
        this.items.push(newItem);
        this.addItemsForm.reset();
      } catch (error) {
        console.error('Error adding item:', error);
        // Display the error to the user
      }
    }
  }

  private calculateExpirationDate(category: string): Date {
    let expiration = new Date();
    expiration.setDate(expiration.getDate() + 7); // Example logic
    return expiration;
  }
}
