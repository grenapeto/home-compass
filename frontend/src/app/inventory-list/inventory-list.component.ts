import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryDetailComponent } from '../inventory-detail/inventory-detail.component';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
})
export class InventoryListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  inventory: any = [];
  pageSize = 10;
  currentPage = 0;

  constructor(
    private inventoryService: InventoryService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.inventoryService.getInventoryItems().subscribe(
      (data: any) => {
        this.inventory = data;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.initializePaginator();
  }

  openDialog(inventoryItem: any): void {
    const dialogRef = this.dialog.open(InventoryDetailComponent, {
      width: '800px',
      data: inventoryItem,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog was closed.');
    });
  }

  initializePaginator(): void {
    if (this.paginator) {
      this.paginator.pageSize = this.pageSize;
      this.paginator.pageIndex = this.currentPage;
    }
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getEarliestExpiry(items: any[]): string {
    if (items.length === 0) {
      return 'N/A'; // Or any default value when there are no items
    }

    // Assuming 'expirationDate' is the property representing the expiration date in each item
    const earliestExpiry = Math.min(
      ...items.map((item) => new Date(item.expirationDate).getTime())
    );
    return new Date(earliestExpiry).toLocaleDateString(); // Format the date as needed
  }

  deleteInventory(index: number): void {
    const itemIndex = this.currentPage * this.pageSize + index;
    // Assuming 'id' is the property representing the ID in each inventory item
    const itemIdToDelete = this.inventory[itemIndex]._id;

    this.inventoryService.deleteInventoryItem(itemIdToDelete).subscribe(
      () => {
        console.log('Item deleted from the database');
        // Additional logic if needed
      },
      (error) => {
        console.error('Error deleting item from the database', error);
        // Handle errors as needed
      }
    );

    this.inventory.splice(itemIndex, 1);
    this.cdr.detectChanges(); // Trigger change detection
    // Perform any additional logic or API calls if needed
  }
}
