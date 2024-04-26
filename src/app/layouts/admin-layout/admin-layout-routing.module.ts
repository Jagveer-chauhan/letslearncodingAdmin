import { RouterModule, Routes } from "@angular/router";
import {NgModule} from '@angular/core';
// import { DashboardComponent } from "app/dashboard/dashboard.component";
import { AdminLayoutComponent } from "./admin-layout.component";
import { MainCategoryComponent } from "./category/main-category/main-category.component";
import { SliderComponent } from "app/slider/slider.component";
import { TeacherComponent } from "app/teacher/teacher.component";
import { BlogComponent } from "app/blog/blog.component";
import { EnquiryComponent } from "app/enquiry/enquiry.component";
import { AddNewCoursePageComponent } from "app/courses/add-new-course-page/add-new-course-page.component";
import { LandingPageEnquiryComponent } from "app/landing-page-enquiry/landing-page-enquiry.component";
import { CoursesComponent } from "app/courses/courses.component";
import { AddBlogComponent } from "app/blog/add-blog/add-blog.component";
import { StudentCornerComponent } from "app/student-corner/student-corner.component";
import { CompanyComponent } from "app/student-corner/company/company.component";
import { SocialLinkComponent } from "app/student-corner/social-link/social-link.component";
import { EventComponent } from "app/student-corner/event/event.component";
import { DashboardComponent } from "app/dashboard/dashboard.component";
import { FooterComponent } from "app/footer/footer.component";
import { CourseCategoryComponent } from "app/course-category/course-category.component";
import { AddCourseCategoryComponent } from "app/course-category/add-course-category/add-course-category.component";

const routes:Routes = [
    {
        path:'', component:AdminLayoutComponent, children:[
            {
                path:'dashboard', component:DashboardComponent
            }, 
            {
                path:'category', loadChildren:()=> import('./category/category.module').then((m)=> m.CategoryModule)
            },
            {
                path:'slider', component:SliderComponent
            },
            {
                path : 'teacher', component:TeacherComponent
            },
            {
                path:'enquiry', component:EnquiryComponent
            },
            {
                path:'course', component:CoursesComponent
            },
            {
                path:'addCoursePage', component:AddNewCoursePageComponent
            },
            {
                path:'addCoursePage/:id', component:AddNewCoursePageComponent
            },
            {
                path:'contact-us', component:LandingPageEnquiryComponent
            },
            {
                path:'coursePage', component:CoursesComponent
            },
            {
                path:'blog', component:BlogComponent
            },
            {
                path:'addBlog', component:AddBlogComponent
            },
            {
                path:'addBlog/:id', component:AddBlogComponent
            },
            // {
            //     path:'student-corner', component:StudentCornerComponent
            // },
            {
                path:'company', component:CompanyComponent
            },
            {
                path:'social-link', component:SocialLinkComponent
            },
            {
                path:'event', component:EventComponent
            },
            {
                path:'footer', component:FooterComponent
            },
            {
                path:'course-category', component:CourseCategoryComponent
            },
            {
                path:'add-course-category', component:AddCourseCategoryComponent
            },
            {
                path:'add-course-category/:id', component:AddCourseCategoryComponent
            }
        ]
    }, 
]

@NgModule({

    imports:[
        RouterModule.forChild(routes)
    ], 
    exports:[RouterModule]
})

export class AdminLayoutRoutingModule{}