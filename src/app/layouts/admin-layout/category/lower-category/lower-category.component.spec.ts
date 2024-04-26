import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowerCategoryComponent } from './lower-category.component';

describe('LowerCategoryComponent', () => {
  let component: LowerCategoryComponent;
  let fixture: ComponentFixture<LowerCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LowerCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LowerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
