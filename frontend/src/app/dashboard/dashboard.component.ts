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
  expData: any; //Prazdny objekt na data z backendu

  sortedExpData: any[] = []; // Prazdny objekt na sortovane data, podla expiration date

  page = 0; //Toto definuje na ktorej stranke chces zacinat, my chceme na prvej stranke ;) 
  size = 3; // Toto definuje kolko veci na jednej stranke chceme zobrazit, mame maly komponent, dajme 5
  total: number = 0; //Najprv ze to je cislo a zaciname s nulou, potom ho nahradime celkovym poctom inventory

  order = new Map<number, number>();

  constructor(private recipesService: RecipesService, private inventoryService: InventoryService) { }

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
    //Pri nacitani stranky zavola getAllInventoryItems a dostane z backendu vsetky inventory items ktore ulozi do ExpData
    this.inventoryService.getAllInventoryItems().subscribe(
      (response) => {
        console.log('inventory', response);
        this.expData = response;
        this.total = response.length;// Tu chceme definovat kolko mame realne tych items, tie items dostaneme z backendu a su ulozene do expData
        this.sortInventoryGroupsByExpiration(); //Potom ako do expData ulozi data z backendu, zavola funkciu sortInventoryGroupsByExpiration, aby vysortovalo tie data podla expiration date
        console.log(`Vysortovane podla expiration date`, this.sortedExpData);
      },
      (error) => {
        console.log('no inventory', error);
      }
    );
  }

  sortInventoryGroupsByExpiration(): void {
    if (this.expData) {
      this.sortedExpData = this.expData.slice().sort((a: any, b: any) => {
        const earliestA = this.getEarliestExpiringItem(a.items)?.expirationDate;
        const earliestB = this.getEarliestExpiringItem(b.items)?.expirationDate;
        return new Date(earliestA).getTime() - new Date(earliestB).getTime();
      });
    }
  }

  getEarliestExpiringItem(items: any[]): any {
    if (!items || items.length === 0) {
      return null
    }
    return items.slice().sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime())[0];
  }

  get paginatedExpData(): any[] { //Tu chceme pre tu tabulku vypocitat ktore items sa maju zobrazovat na ktorej stranke, napr items 1-3 na prvej stranke, items 4-6 na druhej stranke etc
    const startIndex = this.page * this.size; // Startovaci index, cim zaciname bude 0. Kedze startovacia page je 0, a nula krat 3 je stale 0. A prvy item v array ma poradove cislo? Nula.
    const paginatedData = this.sortedExpData.slice(startIndex, startIndex + this.size); //Tu si budeme vyratavat ktore items na ktorej stranke zobrazime. Na prvej stranke je startIndex 0 a potom 0 + size
    return paginatedData;
  }


  items = [
    { w: 2, h: 4, content: 'Latest recipes', type: 'recipes' },
    { w: 1, h: 1, content: 'Click here to add item', type: 'add-item' },
    { w: 1, h: 3, content: 'Closest expiration date', type: 'expiration-date' },
    { w: 1, h: 1, content: 'Item 4' },
    { w: 3, h: 1, content: 'Item 5' },
    { w: 1, h: 1, content: 'Item 6' },
    { w: 1, h: 1, content: 'Item 7' },
    { w: 1, h: 1, content: 'Item 8' },
    { w: 1, h: 1, content: 'Item 9' },
  ];
}
