
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../services/inventory.service';
import {tuiTablePaginationOptionsProvider} from '@taiga-ui/addon-table';

@Component({
  selector: 'app-edit-recipes',
  templateUrl: './edit-recipes.component.html',
  styleUrl: './edit-recipes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRecipesComponent implements OnInit {

  recipe: any;
   
  constructor(private route: ActivatedRoute, private recipeService: RecipesService) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.recipeService.getSingleRecipe(recipeId).subscribe(
        (data) => {
          this.recipe = data;
          console.log(this.recipe)
        },
        (error) => {
          console.log('Error fetching recipe:', error)
        }
      )
    }
  }


}
