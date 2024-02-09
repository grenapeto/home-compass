import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealplanDetailComponent } from './mealplan-detail.component';

describe('MealplanDetailComponent', () => {
  let component: MealplanDetailComponent;
  let fixture: ComponentFixture<MealplanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealplanDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MealplanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
