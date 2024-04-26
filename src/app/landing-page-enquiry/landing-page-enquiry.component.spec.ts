import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageEnquiryComponent } from './landing-page-enquiry.component';

describe('LandingPageEnquiryComponent', () => {
  let component: LandingPageEnquiryComponent;
  let fixture: ComponentFixture<LandingPageEnquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageEnquiryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
