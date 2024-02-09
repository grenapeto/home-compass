import { Component ,Input, OnChanges, SimpleChanges, input } from '@angular/core';

@Component({
  selector: 'app-mealplan-detail',
  templateUrl: './mealplan-detail.component.html',
  styleUrl: './mealplan-detail.component.css'
})
export class MealplanDetailComponent implements OnChanges {
  
@Input() currentDate!: Date;

currentDayName: string = '';
previousDays: Date[] = [];
followingDays: Date[] = [];

ngOnChanges(changes: SimpleChanges): void {
  if (changes['currentDate'] && this.currentDate){
    this.updateDays();
  };
}

private updateDays(): void {
  this.currentDayName = this.currentDate.toLocaleDateString('en-US', { weekday: 'long'})
  this.previousDays = this.calculateDays(-2, -1);
  this.followingDays = this.calculateDays(1, 2);
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