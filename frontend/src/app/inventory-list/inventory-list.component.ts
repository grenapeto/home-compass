import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.less']
})
export class InventoryListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  inventory: any = [];
  pageSize = 5;
  currentPage = 0;

constructor(private inventoryService: InventoryService) {}

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
}




  