import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.less']
})

export class RecipeDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    
  }
}

