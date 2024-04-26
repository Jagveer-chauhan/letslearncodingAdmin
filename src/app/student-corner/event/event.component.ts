import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'app/core/components/core.service';
import { AddEventComponent } from './add-event/add-event.component';
import { StudentCornerService } from 'app/core/services/student-corner.service';
import { ImageModalComponent } from 'app/core/components/image-modal/image-modal.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'venue','date','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  sliderData: any[] = [];
  
  constructor(
    private _dialog: MatDialog, 
    public _studentCornerServices : StudentCornerService,
    public _coreServices : CoreService
  ) { }

  ngOnInit(): void {
    this.getEvent();
  }

  openAddEventForm(){
    const DialogRef = this._dialog.open(AddEventComponent,{
      width : '600px',
      height : '550px',
      data:{type:'add'}
    });
    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getEvent();
        }
      }
    })
  }

  getEvent(){
    this._studentCornerServices.getEvent().subscribe({
      next : (res:any) =>{
        console.log(res);
        this.sliderData = res.data;
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

  deleteEvent(id:string){
    this._studentCornerServices.deleteEvent(id).subscribe({
      next:(res)=>{
        this._coreServices.openSnackBar('Event Deleted Successfully','done');
        this.getEvent();
      },
      error:(err)=>{
        console.log("error",err);
      }
    })
  }

  openEditEventForm(data:any){
    const DialogRef = this._dialog.open(AddEventComponent,{
      width : '600px',
      height : '600px',
      data: {type:'update', data: data},
    });

    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getEvent();
        }
      }
    })
  }

  // showImage(row :any){
  //   const dialogRef = this._dialog.open(ImageModalComponent, {
  //     width: '650px',
  //     data: {images: row.image}, // Pass the images data to the modal
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     console.log('Modal closed');
  //   });
  // }

}
