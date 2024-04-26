import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'app/core/components/core.service';
import { BlogService } from 'app/core/services/blog.service';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { ImageModalComponent } from 'app/core/components/image-modal/image-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'slug',  'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  blogData: any[] = [];

  constructor(private _dialog: MatDialog, 
    public _blogServices : BlogService,
    public _coreServices : CoreService,
    private router : Router) { }

  ngOnInit(): void {
    this.getBlog();
  }

  openAddBlogform(){
    this.router.navigate(['/addBlog'])
  }

  getBlog(){
    this._blogServices.getBlog().subscribe({
      next : (res:any) =>{
        this.blogData = res.data;
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

  deleteBlog(id:string){
    this._blogServices.deleteBlog(id).subscribe({
      next:(res)=>{
        this._coreServices.openSnackBar('Blog Deleted Successfully','done');
        this.getBlog();
      },
      error:(err)=>{
        console.log("error",err);
      }
    });
  }

  openEditBlogform(data:any){
    this.router.navigate(['/addBlog', data.id])
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
