import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from 'app/core/services/course.service'; 
import { AddNewCoursePageComponent } from './add-new-course-page/add-new-course-page.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'course_id', 'title', 'slug', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _dialog: MatDialog,public coursesService: CourseService, public route: Router) { }

  ngOnInit(): void {
    this.getCoursePages();
  }

  openAddCoursePageform(){
    this.route.navigate(['/addCoursePage'])

  }

  getCoursePages(){
    this.coursesService.getCoursePages().subscribe({
      next : (res:any) =>{
       if(res.status == 200 && res.data){
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       }
      },
      error :(err)=>{
        console.log("error", err);
        },
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCoursePage(id:any){
    this.coursesService.deleteCoursePage(id).subscribe({
      next:(res)=>{
        alert("CoursePage deleted successfully");
        this.getCoursePages();
      },
      error:(err)=>{
        console.log("error",err);
      }
    })
  }

  openEditCategoryform(data:any){
    this.route.navigate(['/addCoursePage',data.course_id])
  }
}
