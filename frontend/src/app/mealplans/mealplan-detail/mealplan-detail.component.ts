import { Component ,Input, OnChanges, SimpleChanges, input } from '@angular/core';

@Component({
  selector: 'app-mealplan-detail',
  templateUrl: './mealplan-detail.component.html',
  styleUrl: './mealplan-detail.component.css'
})
export class MealplanDetailComponent implements OnChanges {
  
@Input() currentDate!: Date;
@Input() currentWeek!: Date;

currentDayName: string = '';
previousDays: Date[] = [];
followingDays: Date[] = [];

ngOnChanges(changes: SimpleChanges): void {
  if (changes['currentDate'] && this.currentDate){
    this.updateDays();
  };
  if (changes['currentWeek'] && this.currentWeek) {
    this.updateDaysInWeek();
  };
}

private updateDays(): void {
  this.currentDayName = this.currentDate.toLocaleDateString('en-US', { weekday: 'long'})
  this.previousDays = this.calculateDays(-2, -1);
  this.followingDays = this.calculateDays(1, 2);
}

private updateDaysInWeek(): void {
  this.currentDayName = this.currentWeek.toLocaleDateString('en-US', { weekday: 'long' });

  // Calculate the start and end offset for the previous and following days
  const startOffset = 1 - this.currentWeek.getDay(); // Start from Monday (1)
  const endOffset = 7 - this.currentWeek.getDay(); // End at the end of the week (Sunday)

  this.previousDays = this.calculateDays(startOffset, -1); // Calculate previous days
  this.followingDays = this.calculateDays(1, endOffset); // Calculate following days
}


private calculateDays(startOffset: number, endOffset: number): Date[] {
 const dates: Date[] = [];
 for (let i = startOffset; i <= endOffset; i++){
  let date = new Date(this.currentDate);
  date.setDate(this.currentDate.getDate()+i);
  dates.push(date);
 }
 return dates;
}

}