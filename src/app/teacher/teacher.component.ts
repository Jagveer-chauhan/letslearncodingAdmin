import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherService } from 'app/core/services/teacher.service';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { ImageModalComponent } from 'app/core/components/image-modal/image-modal.component';
import { CoreService } from 'app/core/components/core.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'rank', 'image', 'description', 'slug', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  teacherData: any[] = [];

  constructor(private _dialog: MatDialog, 
    public _teacherServices : TeacherService,
    public _coreServices : CoreService) { }

  ngOnInit(): void {
    this.getTeacher();
  }

  openAddTeacherform(){
    const DialogRef = this._dialog.open(AddTeacherComponent,{
      width : '600px',
      height : '500px',
      data:{type:'add'}
    });
    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getTeacher();
        }
      }
    })
  }

  getTeacher(){
    this._teacherServices.getTeacher().subscribe({
      next : (res:any) =>{
        console.log(res);
        this.teacherData = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
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

  deleteTeacher(id:string){
    this._teacherServices.deleteTeacher(id).subscribe({
      next:(res)=>{
        this._coreServices.openSnackBar('Teacher Deleted Successfully','done');
        this.getTeacher();
      },
      error:(err)=>{
        console.log("error",err);
      }
    })
  }

  openEditTeacherform(data:any){
    const DialogRef = this._dialog.open(AddTeacherComponent,{
      width : '600px',
      height : '500px',
      data: {type:'update', data: data},
    });

    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getTeacher();
        }
      }
    })
  }

  showImage(row :any){
    const dialogRef = this._dialog.open(ImageModalComponent, {
      width: '800px',
      data: {images: row.image}, // Pass the images data to the modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Modal closed');
    });
  }
}
