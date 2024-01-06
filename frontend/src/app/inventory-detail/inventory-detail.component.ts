import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { InventoryService } from '@app/services/inventory.service';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css'],
  providers: [DatePipe],
})
export class InventoryDetailComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private datePipe: DatePipe,
    private inventoryService: InventoryService
  ) {}

  formatExpirationDate(expirationDate: Date | string): string {
    return this.datePipe.transform(expirationDate, 'dd.MM.yyyy')!;
  }

  toggleEditMode(item: any): void {
    // Set editMode to true only for the clicked item
    this.data.items.forEach((inventoryItem: any) => {
      inventoryItem.editMode = (inventoryItem === item);
    });
  }

  saveChanges(item: any): void {
    // Perform any additional logic or API calls to save changes
    item.editMode = false;
  }

  deleteItemById(inventorytoDelete: string, itemToDelete: string): void {
    this.inventoryService.deleteInventoryItemById(inventorytoDelete, itemToDelete).subscribe(
      () => {
        console.log('Item deleted from the database');
        // Additional logic if needed
      },
      (error) => {
        console.error('Error deleting item from the database', error);
        // Handle errors as needed
      }
    );
  }
}
