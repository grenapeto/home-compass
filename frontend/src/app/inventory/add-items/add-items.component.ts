import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';

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
  form!: FormGroup;
  items: InventoryItem[] = [];
  categories = ['Fruits', 'Vegetables', 'Dairy', 'Grains', 'Proteins'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: '',
      quantity: '',
      category: ''
    });
  }

  addItem() {
    const newItem: InventoryItem = {
      ...this.form.value,
      expirationDate: this.calculateExpirationDate(this.form.value.category)
    };

    this.items.push(newItem);
    this.form.reset();
  }

  private calculateExpirationDate(category: string): Date {
    // Logic to determine expiration date based on category
    // For simplicity, using a fixed duration (e.g., 7 days from now)
    let expiration = new Date();
    expiration.setDate(expiration.getDate() + 7);
    return expiration;
  }
}
