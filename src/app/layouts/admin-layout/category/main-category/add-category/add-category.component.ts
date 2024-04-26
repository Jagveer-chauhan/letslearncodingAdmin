import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'app/core/components/core.service';
import { CategoryService } from 'app/core/services/category.service';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryForm : FormGroup;
  
  constructor(private _fb:FormBuilder, 
    public categoryService: CategoryService, 
    public _coreServices: CoreService,
    private _dialogRef : MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {
    this.categoryForm = this._fb.group({
      name : ['', Validators.required],
      rank : ['', Validators.required],
      link : ['', Validators.required]
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
        rank: this.categoryForm.controls.rank.value,
        link:  this.categoryForm.controls.link.value
      }
      if(this.data.type === 'add'){    
      this.categoryService.addCategory(obj).subscribe({
        next:(res:any)=>{
          this._coreServices.openSnackBar('Menu added successfully','done');
          this._dialogRef.close(true);

        },
        error:(err:any)=>{
          console.log('error');
        }
      })
    }
    if(this.data.type ==='update'){
      console.log(this.data.category_id);
      this.categoryService.updateCategory(obj,this.data.data.category_id).subscribe({
        next:(res:any)=>{
          this._coreServices.openSnackBar('Menu Update successfully','done');
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
