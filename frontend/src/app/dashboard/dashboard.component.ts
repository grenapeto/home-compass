import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { InventoryService } from '../services/inventory.service';
import { tuiTablePaginationOptionsProvider } from '@taiga-ui/addon-table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [tuiTablePaginationOptionsProvider({ showPages: false })],
})
export class DashboardComponent implements OnInit {
  readonly columns = ['name', 'cookTime', 'actionbuttons'];
  recipesData: any;

  readonly expColumns = ['name', 'expirationDate', 'amount'];
  expData: any;

  page = 3;
  size = 10;

  order = new Map<number, number>();

  constructor(private recipesService: RecipesService, private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.recipesService.getAllRecipes().subscribe(
      (response) => {
        console.log('recipes', response);
        this.recipesData = response; 
      },
      (error) => {
        console.log('no recipes', error);
      }
    );

    this.inventoryService.getAllInventoryItems().subscribe(
      (response) => {
        console.log('inventory', response);
        this.expData = response; 
      },
      (error) => {
        console.log('no inventory', error);
      }
    );
  }

  

  items = [
    { w: 2, h: 4, content: 'Latest recipes', type: 'recipes' },
    { w: 1, h: 1, content: 'Click here to add item', type: 'add-item'},
    {w: 1, h: 3, content: 'Closest expiration date', type: 'expiration-date'}, 
    {w: 1, h: 1, content: 'Item 4'},
    {w: 3, h: 1, content: 'Item 5'},
    {w: 1, h: 1, content: 'Item 6'},
    {w: 1, h: 1, content: 'Item 7'},
    {w: 1, h: 1, content: 'Item 8'},
    {w: 1, h: 1, content: 'Item 9'},
  ];
}
