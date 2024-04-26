import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'app/core/components/core.service';
import { TeacherService } from 'app/core/services/teacher.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {
  teacherForm : FormGroup;
  srcResult: any;
  selectedFile: any;
  selectedFileName: any;
  isFileNotSelected: boolean = false;
  isFileValid: boolean = false;
  
  constructor(private _fb:FormBuilder, 
    public _teacherService: TeacherService, 
    private _dialogRef : MatDialogRef<AddTeacherComponent>,
    public _coreServices : CoreService,
    @Inject(MAT_DIALOG_DATA) public data:any
    ) {
    this.teacherForm = this._fb.group({
      name : ['', Validators.required],
      rank : ['', Validators.required],
      description : ['', Validators.required],
      slug : ['', Validators.required]
    });
   }

  ngOnInit(): void {
    if(this.data.type == 'update'){
      this.teacherForm.patchValue(this.data.data);
    }
  }

  onFileSelected() {
    this.selectedFile = ''
    this.isFileNotSelected = false;
    this.isFileValid = false;
    this.selectedFileName = '';
    const inputNode: any = document.querySelector('#file');
  
    if(inputNode.files[0].type.includes('image/')){
      this.isFileValid = true;
      this.selectedFile = inputNode.files[0];
      this.selectedFileName = this.selectedFile?.name;
    }else{
      return this.isFileValid = true;
    }
  }

  onFormSubmit(){
    if(this.selectedFile){
      this.isFileNotSelected = false;
    }else{
      return this.isFileNotSelected = true;        
    }
    if(this.teacherForm.valid && this.isFileValid){
      let obj={
        name: this.teacherForm.controls.name.value,
        rank: this.teacherForm.controls.rank.value,
        description: this.teacherForm.controls.description.value,
        slug : this.teacherForm.controls.slug.value
      }
      if(this.data.type === 'add'){    
        const formData =  new FormData();
        formData.append('name',obj.name );
        formData.append('image',this.selectedFile );
        formData.append('description',obj.description );
        formData.append('rank', obj.rank);
        formData.append('slug', obj.slug);

        this._teacherService.addTeacher(formData).subscribe({
          next:(res:any)=>{
            console.log(res);
            this._coreServices.openSnackBar('Teacher added successfully','done');
            this._dialogRef.close(true);

          },
          error:(err:any)=>{
            console.log('error');
          }
        })
    }
    if(this.data.type ==='update'){
      console.log(this.data.category_id);
      this._teacherService.updateTeacher(obj,this.data.data.category_id).subscribe({
        next:(res:any)=>{
          alert('Teacher Update Successfully');
          this._coreServices.openSnackBar('Teacher update successfully','done');
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
