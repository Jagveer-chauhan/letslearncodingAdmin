import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'app/core/components/core.service';
import { ImageModalComponent } from 'app/core/components/image-modal/image-modal.component';
import { StudentCornerService } from 'app/core/services/student-corner.service';

@Component({
  selector: 'app-student-corner',
  templateUrl: './student-corner.component.html',
  styleUrls: ['./student-corner.component.scss']
})
export class StudentCornerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'image', 'description', 'slug', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private _dialog: any;
  
  constructor(
    public _studentCornerService : StudentCornerService,
    public _coreServices : CoreService) { }

  ngOnInit(): void {
    
    // this.getCompany();
  }

  

  // getCompany(){
  //   this._studentCornerService.getTeacher().subscribe({
  //     next : (res:any) =>{
  //       console.log(res);
  //       this.teacherData = res;
  //       this.dataSource = new MatTableDataSource(res);
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
        
  //     },
  //     error :(err)=>{
  //       console.log("error", err);
  //       },
  //   })
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // deleteTeacher(id:string){
  //   this._studentCornerService.deleteTeacher(id).subscribe({
  //     next:(res)=>{
  //       this._coreServices.openSnackBar('Teacher Deleted Successfully','done');
  //       this.getTeacher();
  //     },
  //     error:(err)=>{
  //       console.log("error",err);
  //     }
  //   })
  // }

  

  // showImage(row :any){
  //   const dialogRef = this._dialog.open(ImageModalComponent, {
  //     width: '800px',
  //     data: {images: row.image}, // Pass the images data to the modal
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('Modal closed');
  //   });
  // }
}
