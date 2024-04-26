import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'app/core/services/loader.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    children?: RouteInfo[]; 
}
export const ROUTES: RouteInfo[] = [
  { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: 'enquiry', title: 'Enquiry', icon: 'notifications', class: '',
  children :[
    { path: 'enquiry' ,title:'Enquiry', icon :'notifications' ,class:''},
    // { path: 'contact-us', title: 'Lead Campaign', icon: 'notifications', class: '' },
    
  ]
},
  // {
  //   path: 'category', title: 'Menu', icon: 'dashboard', class: '',
  //   children: [
  //     { path: 'category/main-category', title: 'Main Menu', icon: 'dashboard', class: '' },
  //     { path: 'category/sub-category', title: 'Sub Menu', icon: 'dashboard', class: '' },
  //     { path: 'category/lower-category', title: 'Lower Menu', icon: 'dashboard', class: '' }
  //   ]
  // },
  // { path: 'slider', title: 'Slider', icon: 'content_paste', class: '' },
  // { path: 'teacher', title: 'Teachers', icon: 'person', class: '' },
  { path: 'blog', title: 'Blog', icon: 'library_books', class: '' ,
  children : [
    {path: 'blog', title: 'Blog', icon: 'library_books', class: ''},
    {path: 'addBlog', title: 'Add Blog', icon: 'library_books', class: ''}
  ]
},
//   { path: 'student-corner', title: 'student-corner', icon: 'bubble_chart', class:'' ,
//   children : [
//     // {path:'student-corner' ,title:'student-corner',icon :'bubble_chart' , class:''},
//     {path:'company', title: 'company', icon:'bubble_chart', class: ''},
//     {path:'event', title: 'event', icon:'bubble_chart', class: ''},
//     {path:'social-link', title: 'social-link', icon:'bubble_chart', class: ''}
//   ]
// },
  { path: 'course-category', title: 'Course Categories', icon: 'notifications', class: '',
  children : [
    { path: 'course-category', title: 'Course Categories', icon: 'notifications', class:''},
  ]
},
  { path: 'course', title: 'Course Page', icon: 'notifications', class: '',
  children : [
    { path: 'coursePage', title: 'Course Page', icon: 'notifications', class:''},
    { path: 'addCoursePage', title: 'Add New Course Page', icon: 'notifications', class:''},
  ]
},
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public loaderService: LoaderService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
