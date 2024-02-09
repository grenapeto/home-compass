import { Component } from '@angular/core';
import { TuiDay, TuiMonth } from '@taiga-ui/cdk';
import { TuiMarkerHandler } from '@taiga-ui/core';
import { MealplanDetailComponent } from '../mealplan-detail/mealplan-detail.component';

const TWO_DOTS: [string, string] = [
  'var(--tui-primary)',
  'var(--tui-info-fill)',
];
const ONE_DOT: [string] = ['var(--tui-success-fill)'];

@Component({
  selector: 'app-add-mealplan',
  templateUrl: './add-mealplan.component.html',
  styleUrl: './add-mealplan.component.css',
})
export class AddMealplanComponent {
  value: TuiDay | null = null;

  firstMonth = TuiMonth.currentLocal();

  middleMonth = TuiMonth.currentLocal().append({ month: 1 });

  lastMonth = TuiMonth.currentLocal().append({ month: 2 });

  hoveredItem: TuiDay | null = null;

  mealplanDates: Date[] = []

  readonly markerHandler: TuiMarkerHandler = (day: TuiDay) =>
    // Attention: do not create new arrays in handler, use constants instead
    day.day % 2 === 0 ? TWO_DOTS : ONE_DOT;

    constructor() {
      const currentDay = TuiDay.currentLocal();
      this.updateDates(currentDay);
    }

  onDayClick(day: TuiDay): void {
    this.value = day;
    this.updateDates(day);
  }

  onMonthChangeFirst(month: TuiMonth): void {
    this.firstMonth = month;
    this.middleMonth = month.append({ month: 1 });
    this.lastMonth = month.append({ month: 2 });
  }

  onMonthChangeMiddle(month: TuiMonth): void {
    this.firstMonth = month.append({ month: -1 });
    this.middleMonth = month;
    this.lastMonth = month.append({ month: 1 });
  }

  onMonthChangeLast(month: TuiMonth): void {
    this.firstMonth = month.append({ month: -2 });
    this.middleMonth = month.append({ month: -1 });
    this.lastMonth = month;
  }

  private updateDates(tuiDay: TuiDay): void {
    const selectedDate = new Date(tuiDay.year, tuiDay.month-1, tuiDay.day)
    this.mealplanDates = [];
    for (let i = -2; i <= 2; i++){
      let date = new Date(selectedDate)
      date.setDate(selectedDate.getDate()+i)
      this.mealplanDates.push(date)
    };
  }
}
