import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'app/core/components/core.service';
import { StudentCornerService } from 'app/core/services/student-corner.service';

@Component({
  selector: 'app-add-social-link',
  templateUrl: './add-social-link.component.html',
  styleUrls: ['./add-social-link.component.scss']
})
export class AddSocialLinkComponent implements OnInit {
  LinkForm: any;

  constructor(
    private _fb:FormBuilder, 
    public _studentConnerService: StudentCornerService, 
    private _dialogRef : MatDialogRef<AddSocialLinkComponent>,
    public _coreServices : CoreService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.LinkForm = this._fb.group({
      name : ['', Validators.required],
      link : ['', Validators.required],
    });
   }

  ngOnInit(): void {
    if(this.data.type == 'update'){
      this.LinkForm.patchValue(this.data.data);
    }
  }

  onFormSubmit(){
    if(this.LinkForm.valid){
      let obj={
        name: this.LinkForm.controls.name.value,
        link: this.LinkForm.controls.link.value
      }
      if(this.data.type === 'add'){    
      this._studentConnerService.addLink(obj).subscribe({
        next:(res:any)=>{
          this._coreServices.openSnackBar('Link Added Successfully','done')
          this._dialogRef.close(true);

        },
        error:(err:any)=>{
          console.log('error');
        }
      })
    }
    if(this.data.type ==='update'){
      console.log(this.data.data.id);
      this._studentConnerService.updateLink(obj,this.data.data.id).subscribe({
        next:(res:any)=>{
          this._coreServices.openSnackBar('Link Update Successfully','done')
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
