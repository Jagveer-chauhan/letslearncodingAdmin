import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLowerCategoryComponent } from './add-lower-category.component';

describe('AddLowerCategoryComponent', () => {
  let component: AddLowerCategoryComponent;
  let fixture: ComponentFixture<AddLowerCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLowerCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLowerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
