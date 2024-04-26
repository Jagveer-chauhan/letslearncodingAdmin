import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddLowerCategoryComponent } from './add-lower-category/add-lower-category.component';
import { CategoryService } from 'app/core/services/category.service';

@Component({
  selector: 'app-lower-category',
  templateUrl: './lower-category.component.html',
  styleUrls: ['./lower-category.component.scss']
})
export class LowerCategoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'rank', 'link', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _dialog: MatDialog,public _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getLowerCategory();
  }

  openAddCategoryform(){
    const DialogRef = this._dialog.open(AddLowerCategoryComponent,{
      data:{type:'add'}
    });
    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getLowerCategory();
        }
      }
    })
  }

  getLowerCategory(){
    this._categoryService.getLowerCategory().subscribe({
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

  deleteCategory(id:any){
    this._categoryService.deleteLowerCategoryById(id).subscribe({
      next:(res)=>{
        alert("Category deleted successfully");
        this.getLowerCategory();
      },
      error:(err)=>{
        console.log("error",err);
      }
    })
  }

  openEditCategoryform(data:any){
    const DialogRef = this._dialog.open(AddLowerCategoryComponent,{
      data: {type:'update', data: data},
    });

    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getLowerCategory();
        }
      }
    })
  }
}
