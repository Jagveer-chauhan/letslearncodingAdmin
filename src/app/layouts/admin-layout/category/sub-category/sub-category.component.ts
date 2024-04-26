import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { CategoryService } from 'app/core/services/category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'rank', 'link', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private _dialog: MatDialog, public _CategoryServices : CategoryService) { }

  ngOnInit(): void {
    this.getSubCategory();
  }

  openAddSubCategoryform(){
    const DialogRef = this._dialog.open(AddSubCategoryComponent,{
      data:{type:'add'}
    });
    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getSubCategory();
        }
      }
    })
  }

  getSubCategory(){
    this._CategoryServices.getSubCategory().subscribe({
      next : (res:any) =>{
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);
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

  deleteSubCategory(id:any){
    this._CategoryServices.deleteSubCategoryById(id).subscribe({
      next:(res)=>{
        alert("Category deleted successfully");
        this.getSubCategory();
      },
      error:(err)=>{
        console.log("error",err);
      }
    })
  }

  openEditSubCategoryform(row:any){
    const DialogRef = this._dialog.open(AddSubCategoryComponent,{
      data: {type:'update', data: row},
    });

    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getSubCategory();
        }
      }
    })
  }
}
