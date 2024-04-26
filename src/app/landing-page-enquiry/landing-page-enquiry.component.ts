import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'app/core/components/core.service';
import { EnquiryService } from 'app/core/services/enquiry.service';

@Component({
  selector: 'app-landing-page-enquiry',
  templateUrl: './landing-page-enquiry.component.html',
  styleUrls: ['./landing-page-enquiry.component.scss'],
})
export class LandingPageEnquiryComponent implements OnInit {
  color: ThemePalette = 'accent';
  // checked = false;
  // disabled = false;

  // changed(){
  //   console.log(this.checked)
  // }

  displayedColumns : string[] = ['id', 'name', 'email', 'mobile_number','course_name', 'date'];
  dataSource : MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
  landingEnquiry: any[]= [];

  constructor(private _dialog:MatDialog,
    public _coreService : CoreService,
    public enquiryServices:EnquiryService) { }

  ngOnInit(): void {
    this.getLandingEnquiry();
  }

  getLandingEnquiry(){
    this.enquiryServices.getLandingEnquires().subscribe({
      next : (res:any) =>{
        // console.log(res.data);
        this.landingEnquiry = res.data;
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error :(err)=>{
        console.log("error",err);
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

}
