import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'app/core/components/core.service';
import { CategoryService } from 'app/core/services/category.service';

@Component({
  selector: 'app-add-lower-category',
  templateUrl: './add-lower-category.component.html',
  styleUrls: ['./add-lower-category.component.scss']
})
export class AddLowerCategoryComponent implements OnInit {

  lowerCategoryForm : FormGroup;
  subCategoryList : string[];
  constructor(private _fb:FormBuilder, 
    public _CategoryService: CategoryService, 
    public _coreServices: CoreService,
    private _dialogRef : MatDialogRef<AddLowerCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { 
      this.lowerCategoryForm = this._fb.group({
        name : [null, Validators.required],
        rank : [null, Validators.required],
        link : [null, Validators.required],
        sub_category_id:[null, Validators.required],
      })
    }

    ngOnInit(): void {
      if(this.data.type == 'update'){
        this.lowerCategoryForm.patchValue(this.data.data);
        this.lowerCategoryForm.controls.sub_category_id.setValue(this.data.data.subcategory_id)
      }
      this.getSubCategory();
    }

    getSubCategory(){
      this._CategoryService.getSubCategory().subscribe({
        next : (res:any) =>{
         this.subCategoryList = res.data;
        },
        error :(err)=>{
          console.log("error", err);
          },
      })
    }

    onFormSubmit(){
      if(this.lowerCategoryForm.valid){
        let obj={
          name: this.lowerCategoryForm.controls.name.value,
          rank: this.lowerCategoryForm.controls.rank.value,
          link:  this.lowerCategoryForm.controls.link.value ,
          sub_category_id:Number(this.lowerCategoryForm.controls.sub_category_id.value),
        }
        if(this.data.type === 'add'){    
        this._CategoryService.addLowerSubCategory(obj).subscribe({
          next:(res:any)=>{
            this._coreServices.openSnackBar('Lower Menu added successfully','done');
            this._dialogRef.close(true);
  
          },
          error:(err:any)=>{
            console.log('error');
          }
        })
      }
      if(this.data.type ==='update'){
        console.log(this.data.data.subcategory_id);
        this._CategoryService.updateLowerSubCategory(obj,this.data.data.id).subscribe({
          next:(res:any)=>{
            this._coreServices.openSnackBar('Lower Menu Update successfully','done');
            this._dialogRef.close(true);
          },
          error:(err:any)=>{
            console.log('error');
          }
        })
      }
    }
  
      
    }

}
