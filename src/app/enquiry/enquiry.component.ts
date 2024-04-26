import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'app/core/components/core.service';
import { EnquiryService } from 'app/core/services/enquiry.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'message', 'date'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  enquiryData: any[] = [];

  constructor(private _dialog: MatDialog, 
    public _coreServices : CoreService, 
    public enquiryService:EnquiryService) { }

  ngOnInit(): void {
    this.getEnquiry();
  }


  getEnquiry(){
    this.enquiryService.getEnquiries().subscribe({
      next : (res:any) =>{
        console.log(res);
        this.enquiryData = res.data;
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      },
      error :(err)=>{
        console.log("error", err);
        },
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // deleteTeacher(id:string){
  //   this.enquiryService.deleteEnquiry(id).subscribe({
  //     next:(res)=>{
  //       this._coreServices.openSnackBar('Teacher Deleted Successfully','done');
  //       this.getEnquiry();
  //     },
  //     error:(err)=>{
  //       console.log("error",err);
  //     }
  //   })
  // }


}
