import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CoreService } from 'app/core/components/core.service';
import { StudentCornerService } from 'app/core/services/student-corner.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  eventForm : FormGroup;
  srcResult: any;
  selectedFile: any;
  selectedFileName: any;
  isFileNotSelected: boolean = false;
  selectedSliderFile: File | undefined;
  selectedSliderImage: SafeUrl;

  constructor(
    private _fb:FormBuilder, 
    public _studentCornerService: StudentCornerService, 
    private _dialogRef : MatDialogRef<AddEventComponent>,
    public _coreServices : CoreService,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.eventForm = this._fb.group({
      title : ['', Validators.required],
      description : ['', Validators.required],
      date : ['', Validators.required],
      topic : ['', Validators.required],
      venue : ['', Validators.required],
      speaker : ['', Validators.required],
      slug : ['', Validators.required],
    });
   }

  ngOnInit(): void {
    if(this.data.type == 'update'){
      this.eventForm.patchValue(this.data.data);
      this.selectedSliderImage = this.data.data.image
    }
  }

  onFileSelected() {
    this.selectedFile = ''
    this.isFileNotSelected = false;
    this.selectedFileName = '';
    const inputNode: any = document.querySelector(`#file`);
  
    if(inputNode.files[0].type.includes('image/webp')){
      const sliderFile = inputNode.files[0]
      this.selectedFile = inputNode.files[0];
      this.selectedFileName = this.selectedFile?.name;
      this.selectedSliderImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFile));
  
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
    if(this.eventForm.valid){
      let obj=this.eventForm.value
      if(this.data.type === 'add'){    
        const formData =  new FormData();
        formData.append('title',obj.title );
        formData.append('image',this.selectedFile );
        formData.append('description',obj.description );
        formData.append('date', obj.date);
        formData.append('topic', obj.topic);
        formData.append('venue', obj.venue);
        formData.append('speaker', obj.speaker);
        formData.append('slug', obj.slug);

        this._studentCornerService.addEvent(formData).subscribe({
          next:(res:any)=>{
            this._coreServices.openSnackBar('Event added successfully','done');
            this._dialogRef.close(true);
          },
          error:(err:any)=>{
            console.log('error');
          }
        })
    }
    if(this.data.type ==='update'){
      const formData = new FormData();
      formData.append('title',obj.title);
      formData.append('image',this.selectedFile);
      formData.append('description',obj.description);
      formData.append('date', obj.date);
        formData.append('topic', obj.topic);
        formData.append('venue', obj.venue);
        formData.append('speaker', obj.speaker);
        formData.append('slug', obj.slug);
      this._studentCornerService.updateEvent(formData,this.data.data.id).subscribe({
        next:(res:any)=>{
          this._coreServices.openSnackBar('Event update successfully','done');
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

