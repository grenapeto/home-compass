import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMealplanComponent } from './add-mealplan.component';

describe('AddMealplanComponent', () => {
  let component: AddMealplanComponent;
  let fixture: ComponentFixture<AddMealplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMealplanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMealplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
