import { Component } from '@angular/core';


@Component({
  selector: 'app-mealplan-detail',
  templateUrl: './mealplan-detail.component.html',
  styleUrl: './mealplan-detail.component.css'
})
export class MealplanDetailComponent {
  currentDate: Date;
  currentDayName: string;

  constructor() {
    this.currentDate = new Date();
    this.currentDayName = this.getCurrentDayName();
  }

  getCurrentDayName(): string {
    const date = new Date();
    return date.toLocaleDateString('en-US', { weekday: 'long'})
  }
}