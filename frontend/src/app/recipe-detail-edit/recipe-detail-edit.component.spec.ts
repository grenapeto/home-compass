import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailEditComponent } from './recipe-detail-edit.component';

describe('RecipeDetailEditComponent', () => {
  let component: RecipeDetailEditComponent;
  let fixture: ComponentFixture<RecipeDetailEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeDetailEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeDetailEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
