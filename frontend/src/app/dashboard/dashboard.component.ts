import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { InventoryService } from '../services/inventory.service';
import { tuiTablePaginationOptionsProvider } from '@taiga-ui/addon-table';
import { TuiDay } from '@taiga-ui/cdk';

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
  readonly expColumns = ['name', 'expirationDate', 'amount', 'delete'];
  expData: any; //Prazdny objekt na data z backendu
  date: any = '';
  mealplanDates: Date[] = [];
  sortedExpData: any[] = []; // Prazdny objekt na sortovane data, podla expiration date

  //Pagination expiration date

  page = 0; //Toto definuje na ktorej stranke chces zacinat, my chceme na prvej stranke ;)
  size = 4; // Toto definuje kolko veci na jednej stranke chceme zobrazit, mame maly komponent, dajme 5
  total: number = 0; //Najprv ze to je cislo a zaciname s nulou, potom ho nahradime celkovym poctom inventory

  //Pagination recipes

  pageRecipes = 0;
  sizeRecipes = 7;
  totalRecipes: number = 0;

  order = new Map<number, number>();

  constructor(
    private recipesService: RecipesService,
    private inventoryService: InventoryService
  ) {
    const currentDay = TuiDay.currentLocal();
    this.date = currentDay;
    this.updateDates(currentDay);

  }

  ngOnInit(): void {
    this.recipesService.getAllRecipes().subscribe(
      (response) => {
        console.log('recipes', response);
        this.recipesData = response;
        this.totalRecipes = this.recipesData.length;
        console.log(this.totalRecipes);
      },
      (error) => {
        console.log('no recipes', error);
      }
    );

    this.fetchInventory();
}


  fetchInventory(): void {
    //Pri nacitani stranky zavola getAllInventoryItems a dostane z backendu vsetky inventory items ktore ulozi do ExpData
    this.inventoryService.getAllInventoryItems().subscribe(
      (response) => {
        console.log('inventory', response);
        this.expData = response;
        this.total = response.length; // Tu chceme definovat kolko mame realne tych items, tie items dostaneme z backendu a su ulozene do expData
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
      return null;
    }
    return items
      .slice()
      .sort(
        (a, b) =>
          new Date(a.expirationDate).getTime() -
          new Date(b.expirationDate).getTime()
      )[0];
  }

  get paginatedExpData(): any[] {
    //Tu chceme pre tu tabulku vypocitat ktore items sa maju zobrazovat na ktorej stranke, napr items 1-3 na prvej stranke, items 4-6 na druhej stranke etc
    const startIndex = this.page * this.size; // Startovaci index, cim zaciname bude 0. Kedze startovacia page je 0, a nula krat 3 je stale 0. A prvy item v array ma poradove cislo? Nula.
    const paginatedData = this.sortedExpData.slice(
      startIndex,
      startIndex + this.size
    ); //Tu si budeme vyratavat ktore items na ktorej stranke zobrazime. Na prvej stranke je startIndex 0 a potom 0 + size
    return paginatedData;
  }

  get paginatedRecipes(): any[] {
    //Tu chceme pre tu tabulku vypocitat ktore items sa maju zobrazovat na ktorej stranke, napr items 1-3 na prvej stranke, items 4-6 na druhej stranke etc
    const startIndexRecipes = this.pageRecipes * this.sizeRecipes; // Startovaci index, cim zaciname bude 0. Kedze startovacia page je 0, a nula krat 3 je stale 0. A prvy item v array ma poradove cislo? Nula.
    const paginatedRecipes = this.recipesData.slice(
      startIndexRecipes,
      startIndexRecipes + this.sizeRecipes
    ); //Tu si budeme vyratavat ktore items na ktorej stranke zobrazime. Na prvej stranke je startIndex 0 a potom 0 + size
    return paginatedRecipes;
  }

  deleteItem(inventoryId: string, itemId: string): void {
    this.inventoryService
      .deleteInventoryItemById(inventoryId, itemId)
      .subscribe(
        (response) => {
          console.log('Item successfully deleted', response);
          this.fetchInventory();
        },
        (error) => {
          console.log('Item not deleted', error);
        }
      );
  }

  private updateDates(tuiDay: TuiDay): void {
    const selectedDate = new Date(tuiDay.year, tuiDay.month - 1, tuiDay.day);
    this.mealplanDates = [];

    // Calculate the start date (Monday) of the week containing the selected date
    const startDate = new Date(selectedDate);
    startDate.setDate(startDate.getDate() - (startDate.getDay() - 1));

    // Calculate the end date (Sunday) of the week containing the selected date
    const endDate = new Date(selectedDate);
    endDate.setDate(endDate.getDate() + (7 - endDate.getDay()));

    // Populate mealplanDates with dates spanning the entire week
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        this.mealplanDates.push(new Date(currentDate));
        console.log(this.mealplanDates)
        currentDate.setDate(currentDate.getDate() + 1);
    }
}


  items = [
    { w: 1, h: 6, content: 'Latest recipes', type: 'recipes' },
    { w: 1, h: 3, content: 'Click here to add item', type: 'add-item' },
    { w: 1, h: 3, content: 'Closest expiration date', type: 'expiration-date' },
    { w: 2, h: 3, content: 'Mealplan for the week', type: 'mealplan'},
    
  ];
}
