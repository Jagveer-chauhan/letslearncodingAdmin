import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from 'app/core/services/category.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.scss']
})
export class MainCategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'rank', 'link', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _dialog: MatDialog,public _categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getcategory();
  }

  openAddCategoryform(){
    const DialogRef = this._dialog.open(AddCategoryComponent,{
      data:{type:'add'}
    });
    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getcategory();
        }
      }
    })
  }

  getcategory(){
    this._categoryService.getCategory().subscribe({
      next : (res:any) =>{
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

  deleteCategory(id:string){
    this._categoryService.deleteCategoryById(id).subscribe({
      next:(res)=>{
        alert("Category deleted successfully");
        this.getcategory();
      },
      error:(err)=>{
        console.log("error",err);
      }
    })
  }

  openEditCategoryform(data:any){
    const DialogRef = this._dialog.open(AddCategoryComponent,{
      data: {type:'update', data: data},
    });

    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getcategory();
        }
      }
    })
  }
}

