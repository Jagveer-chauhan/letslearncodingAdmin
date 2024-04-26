import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { LoginComponent } from './login/login.component';
import { OnetickCdcInterceptor } from './auth/onecdc.interceptor';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TeacherComponent } from './teacher/teacher.component';
import { SliderComponent } from './slider/slider.component';
import { AddTeacherComponent } from './teacher/add-teacher/add-teacher.component';
import { ImageModalComponent } from './core/components/image-modal/image-modal.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BlogComponent } from './blog/blog.component';
import { AddBlogComponent } from './blog/add-blog/add-blog.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { CoursesComponent } from './courses/courses.component';
import { AddNewCoursePageComponent } from './courses/add-new-course-page/add-new-course-page.component';
import { MatStepperModule } from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { LandingPageEnquiryComponent } from './landing-page-enquiry/landing-page-enquiry.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { AddSliderComponent } from './slider/add-slider/add-slider.component';
import { StudentCornerComponent } from './student-corner/student-corner.component';
import { CompanyComponent } from './student-corner/company/company.component';
import { AddCompanyComponent } from './student-corner/company/add-company/add-company.component';
import { SocialLinkComponent } from './student-corner/social-link/social-link.component';
import { AddSocialLinkComponent } from './student-corner/social-link/add-social-link/add-social-link.component';
import { EventComponent } from './student-corner/event/event.component';
import { AddEventComponent } from './student-corner/event/add-event/add-event.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { AddFooterComponent } from './footer/add-footer/add-footer.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CourseCategoryComponent } from './course-category/course-category.component';
import { AddCourseCategoryComponent } from './course-category/add-course-category/add-course-category.component';




@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatStepperModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    AppRoutingModule,
    ComponentsModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CKEditorModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
         TeacherComponent,
         SliderComponent,
         AddTeacherComponent,
         ImageModalComponent,
         BlogComponent,
         AddBlogComponent,
         EnquiryComponent,
         CoursesComponent,
         AddNewCoursePageComponent,
         LandingPageEnquiryComponent,
         AddSliderComponent,
         StudentCornerComponent,
         CompanyComponent,
         AddCompanyComponent,
         SocialLinkComponent,
         AddSocialLinkComponent,
         EventComponent,
         AddEventComponent,
         DashboardComponent,
         FooterComponent,
         AddFooterComponent,
         CourseCategoryComponent,
         AddCourseCategoryComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OnetickCdcInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
