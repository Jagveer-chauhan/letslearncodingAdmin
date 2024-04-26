import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'app/core/components/core.service';
import { SliderService } from 'app/core/services/slider.service';
import { AddSliderComponent } from './add-slider/add-slider.component';
import { ImageModalComponent } from 'app/core/components/image-modal/image-modal.component';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'rank', 'image', 'description','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  sliderData: any[] = [];

  
  constructor(
    private _dialog: MatDialog, 
    public _sliderServices : SliderService,
    public _coreServices : CoreService
  ) { }

  ngOnInit(): void {
    this.getSlider();
  }

  openAddSliderform(){
    const DialogRef = this._dialog.open(AddSliderComponent,{
      width : '600px',
      height : '550px',
      data:{type:'add'}
    });
    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getSlider();
        }
      }
    })
  }


  getSlider(){
    this._sliderServices.getSlider().subscribe({
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

  deleteSlider(id:string){
    this._sliderServices.deleteSlider(id).subscribe({
      next:(res)=>{
        this._coreServices.openSnackBar('Slider Deleted Successfully','done');
        this.getSlider();
      },
      error:(err)=>{
        console.log("error",err);
      }
    })
  }

  openEditSliderform(data:any){
    const DialogRef = this._dialog.open(AddSliderComponent,{
      width : '600px',
      height : '600px',
      data: {type:'update', data: data},
    });

    DialogRef.afterClosed().subscribe({
      next : (val) =>{
        if(val){
          this.getSlider();
        }
      }
    })
  }

  showImage(row :any){
    const dialogRef = this._dialog.open(ImageModalComponent, {
      width: '650px',
      data: {images: row.image}, // Pass the images data to the modal
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Modal closed');
    });
  }

}
