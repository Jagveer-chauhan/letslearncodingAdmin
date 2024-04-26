import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'app/core/components/core.service';
import { FooterService } from 'app/core/services/footer.service';

@Component({
  selector: 'app-add-footer',
  templateUrl: './add-footer.component.html',
  styleUrls: ['./add-footer.component.scss']
})
export class AddFooterComponent implements OnInit {
  footerForm: any;

  constructor(
    private _fb:FormBuilder, 
    public _footerService: FooterService, 
    private _dialogRef : MatDialogRef<AddFooterComponent>,
    public _coreServices : CoreService,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.footerForm = this._fb.group({
      name : ['', Validators.required],
      link : ['', Validators.required],
      rank : ['', Validators.required]
    });
   }

  ngOnInit(): void {
    if(this.data.type == 'update'){
      this.footerForm.patchValue(this.data.data);
    }
  }

  onFormSubmit(){
    if(this.footerForm.valid){
      let obj={
        name: this.footerForm.controls.name.value,
        link: this.footerForm.controls.link.value,
        rank: this.footerForm.controls.rank.value,
      }
      if(this.data.type === 'add'){    
      this._footerService.addFooter(obj).subscribe({
        next:(res:any)=>{
          this._coreServices.openSnackBar('Footer Added Successfully','done')
          this._dialogRef.close(true);

        },
        error:(err:any)=>{
          console.log('error');
        }
      })
    }
    if(this.data.type ==='update'){
      console.log(this.data.data.id);
      this._footerService.updateFooter(obj,this.data.data.id).subscribe({
        next:(res:any)=>{
          this._coreServices.openSnackBar('Footer Update Successfully','done')
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
