import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'app/core/components/core.service';
import { StudentCornerService } from 'app/core/services/student-corner.service';
import { AddCompanyComponent } from './add-company/add-company.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'image', 'rank', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  CompanyData: any;
  
  constructor(
    private _dialog: MatDialog, 
    public _studentCornerService : StudentCornerService,
    public _coreServices : CoreService
  ) { }

  ngOnInit(): void {
    this.getCompany();
  }

  openAddCompanyform(){
    const DialogRef = this._dialog.open(AddCompanyComponent,{
      width : '600px',
      height : '500px',
      data:{type:'add'}
    });
    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getCompany();
        }
      }
    })
  }

  getCompany(){
    this._studentCornerService.getCompany().subscribe({
      next : (res:any) =>{
        console.log(res);
        this.CompanyData = res.data;
        this.dataSource = new MatTableDataSource(res.data);
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

  deleteCompany(id:string){
    this._studentCornerService.deleteCompany(id).subscribe({
      next:(res)=>{
        this._coreServices.openSnackBar('Company Deleted Successfully','done');
        this.getCompany();
      },
      error:(err)=>{
        console.log("error",err);
      }
    })
  }

  openEditCompanyform(data:any){
    const DialogRef = this._dialog.open(AddCompanyComponent,{
      width : '600px',
      height : '500px',
      data: {type:'update', data: data},
    });

    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getCompany();
        }
      }
    })
  }

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
