import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCoursePageComponent } from './add-new-course-page.component';

describe('AddNewCoursePageComponent', () => {
  let component: AddNewCoursePageComponent;
  let fixture: ComponentFixture<AddNewCoursePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCoursePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewCoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
