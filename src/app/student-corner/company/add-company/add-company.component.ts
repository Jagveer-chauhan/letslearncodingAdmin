import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CoreService } from 'app/core/components/core.service';
import { StudentCornerService } from 'app/core/services/student-corner.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  CompanyForm: FormGroup;
  selectedFile: any;
  isFileNotSelected: boolean = false;
  isFileValid: boolean = false;
  selectedFileName: any;
  selectedCompanyImage: SafeUrl;

  constructor(
    private _fb:FormBuilder, 
    public _studentConnerService: StudentCornerService, 
    private _dialogRef : MatDialogRef<AddCompanyComponent>,
    public _coreServices : CoreService,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.CompanyForm = this._fb.group({
      name : ['', Validators.required],
      rank : ['', Validators.required],
    });
   }

  ngOnInit(): void {
    if(this.data.type == 'update'){
      this.CompanyForm.patchValue(this.data.data);
      this.selectedCompanyImage = this.data.data.image;
    }
  }

  onFileSelected() {
    this.selectedFile = ''
    this.isFileNotSelected = false;
    this.isFileValid = false;
    this.selectedFileName = '';
    const inputNode: any = document.querySelector(`#file`);
  
    if(inputNode.files[0].type.includes('image/webp')){
      const companyFile = inputNode.files[0]
      this.isFileValid = true;
      this.selectedFile = inputNode.files[0];
      this.selectedFileName = this.selectedFile?.name;
      this.selectedCompanyImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFile));
  
    }else{
      this._coreServices.openSnackBar('Please upload image in webp extension', 'Error');
    }
  }

  onFormSubmit(){
    if(this.selectedFile){
      this.isFileNotSelected = false;
    }else{
      return this.isFileNotSelected = true;        
    }
    if(this.CompanyForm.valid){
      let obj={
        name: this.CompanyForm.controls.name.value,
        rank: this.CompanyForm.controls.rank.value,
      }
      if(this.data.type === 'add'){    
        const formData =  new FormData();
        formData.append('name',obj.name );
        formData.append('image',this.selectedFile );
        formData.append('rank', obj.rank);

        this._studentConnerService.addCompany(formData).subscribe({
          next:(res:any)=>{
            this._coreServices.openSnackBar('Company added successfully','done');
            this._dialogRef.close(true);
          },
          error:(err:any)=>{
            console.log('error');
          }
        })
    }
    if(this.data.type ==='update'){
      const formData = new FormData();
      formData.append('name',obj.name);
      formData.append('image',this.selectedFile);
      formData.append('rank',obj.rank);
      this._studentConnerService.updateCompany(formData,this.data.data.id).subscribe({
        next:(res:any)=>{
          this._coreServices.openSnackBar('Company update successfully','done');
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
