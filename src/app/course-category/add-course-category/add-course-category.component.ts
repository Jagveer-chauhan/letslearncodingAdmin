import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'app/core/components/core.service';
import { CourseCategoryService } from 'app/core/services/course-category.service';

@Component({
  selector: 'app-add-course-category',
  templateUrl: './add-course-category.component.html',
  styleUrls: ['./add-course-category.component.scss']
})
export class AddCourseCategoryComponent implements OnInit {
  categoryForm : FormGroup;
  
  constructor(private _fb:FormBuilder, 
    public categoryService: CourseCategoryService, 
    public _coreServices: CoreService,
    private _dialogRef : MatDialogRef<AddCourseCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {
    this.categoryForm = this._fb.group({
      name : ['', Validators.required],
    })
   }

  ngOnInit(): void {
    if(this.data.type == 'update'){
      this.categoryForm.patchValue(this.data.data);
    }
  }

  onFormSubmit(){
    if(this.categoryForm.valid){
      let obj={
        name: this.categoryForm.controls.name.value,
      }
      if(this.data.type === 'add'){    
      this.categoryService.addCategory(obj).subscribe({
        next:(res:any)=>{
          this._coreServices.openSnackBar('Category added successfully','done');
          this._dialogRef.close(true);

        },
        error:(err:any)=>{
          console.log('error');
        }
      })
    }
    if(this.data.type ==='update'){
      console.log(this.data.id);
      this.categoryService.updateCategory(obj,this.data.data.id).subscribe({
        next:(res:any)=>{
          this._coreServices.openSnackBar('Category Update successfully','done');
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
