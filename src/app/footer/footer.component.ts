import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'app/core/components/core.service';
import { FooterService } from 'app/core/services/footer.service';
import { AddFooterComponent } from './add-footer/add-footer.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'link', 'rank', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  footerData: any;
  constructor(
    public _footerService : FooterService,
    public _coreServices : CoreService,
    private _dialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.getFooter();
  }

  openAddFooterForm(){
    const DialogRef = this._dialog.open(AddFooterComponent,{
      width : '600px',
      height : '500px',
      data:{type:'add'}
    });
    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getFooter();
        }
      }
    })
  }


  getFooter(){
    this._footerService.getFooter().subscribe({
      next : (res:any) =>{
        this.footerData = res;
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

  deleteFooter(id:string){
    this._footerService.deleteFooter(id).subscribe({
      next:(res)=>{
        this._coreServices.openSnackBar('Footer Deleted Successfully','done');
        this.getFooter();
      },
      error:(err)=>{
        console.log("error",err);
      }
    })
  }

  openEditFooterForm(data:any){
    const DialogRef = this._dialog.open(AddFooterComponent,{
      width : '600px',
      height : '500px',
      data: {type:'update', data: data},
    });

    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getFooter();
        }
      }
    })
  }
}
