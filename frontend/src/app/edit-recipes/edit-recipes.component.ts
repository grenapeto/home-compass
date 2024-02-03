
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { InventoryService } from '../services/inventory.service';
import {tuiTablePaginationOptionsProvider} from '@taiga-ui/addon-table';

@Component({
  selector: 'app-edit-recipes',
  templateUrl: './edit-recipes.component.html',
  styleUrl: './edit-recipes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRecipesComponent {
   
}
