import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'app/core/components/core.service';
import { CategoryService } from 'app/core/services/category.service';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {
  subCategoryForm : FormGroup;
  mainCategoryList : string[];
  constructor(
    private _fb : FormBuilder,
    public _categoryService : CategoryService,
    public _coreServices: CoreService,
    public _dialogRef : MatDialogRef<AddSubCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any
  ) { 
    this.subCategoryForm = this._fb.group({
      category_id:[null, Validators.required],
      name : [null, Validators.required],
      rank : [null, Validators.required],
      link : [null, Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.data.type == 'update'){
      this.subCategoryForm.patchValue(this.data.data);
    }
    this.getMainCategoryList();
  }

  getMainCategoryList(){
    this._categoryService.getCategory().subscribe({
      next : (res:any) =>{
       this.mainCategoryList = res.data;
        console.log(res);
      },
      error :(err)=>{
        console.log("error", err);
        },
    })
  }

  onFormSubmit(){
    if(this.subCategoryForm.valid){
      let obj={
        name: this.subCategoryForm.controls.name.value,
        rank: this.subCategoryForm.controls.rank.value,
        link:  this.subCategoryForm.controls.link.value,
        category_id: Number(this.subCategoryForm.controls.category_id.value)
      }
      if(this.data.type === 'add'){    
      this._categoryService.addSubCategory(obj).subscribe({
        next:(res:any)=>{
          this._coreServices.openSnackBar('Sub Menu added successfully','done');
          this._dialogRef.close(true);

        },
        error:(err:any)=>{
          console.log('error');
        }
      })
    }
    if(this.data.type ==='update'){
      console.log(this.data.category_id);
      this._categoryService.updateSubCategory(obj,this.data.data.sub_category_id).subscribe({
        next:(res:any)=>{
          this._coreServices.openSnackBar('Sub menu Update successfully','done');
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
