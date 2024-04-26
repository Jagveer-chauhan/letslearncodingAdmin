import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'app/core/components/core.service';
import { StudentCornerService } from 'app/core/services/student-corner.service';
import { AddSocialLinkComponent } from './add-social-link/add-social-link.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-social-link',
  templateUrl: './social-link.component.html',
  styleUrls: ['./social-link.component.scss']
})
export class SocialLinkComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'link','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  linkData: any;
  
  constructor(
    public _studentCornerService : StudentCornerService,
    public _coreServices : CoreService,
    private _dialog: MatDialog, 
  ) { }

  ngOnInit(): void {
    this.getLink();
  }

  openAddLinkForm(){
    const DialogRef = this._dialog.open(AddSocialLinkComponent,{
      width : '600px',
      height : '500px',
      data:{type:'add'}
    });
    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getLink();
        }
      }
    })
  }

  getLink(){
    this._studentCornerService.getLink().subscribe({
      next : (res:any) =>{
        this.linkData = res.data;
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

  deleteLink(id:string){
    this._studentCornerService.deleteLink(id).subscribe({
      next:(res)=>{
        this._coreServices.openSnackBar('Link Deleted Successfully','done');
        this.getLink();
      },
      error:(err)=>{
        console.log("error",err);
      }
    })
  }

  openEditLinkform(data:any){
    const DialogRef = this._dialog.open(AddSocialLinkComponent,{
      width : '600px',
      height : '500px',
      data: {type:'update', data: data},
    });

    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getLink();
        }
      }
    })
  }
  

}
