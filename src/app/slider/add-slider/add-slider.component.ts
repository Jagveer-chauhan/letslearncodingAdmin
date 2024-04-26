import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CoreService } from 'app/core/components/core.service';
import { SliderService } from 'app/core/services/slider.service';

@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrls: ['./add-slider.component.scss']
})
export class AddSliderComponent implements OnInit {
  sliderForm : FormGroup;
  srcResult: any;
  selectedFile: any;
  selectedFileName: any;
  isFileNotSelected: boolean = false;
  isFileValid: boolean = false;
  selectedSliderFile: File | undefined;
  selectedSliderImage: SafeUrl;


  constructor(
    private _fb:FormBuilder, 
    public _sliderService: SliderService, 
    private _dialogRef : MatDialogRef<AddSliderComponent>,
    public _coreServices : CoreService,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { 
    this.sliderForm = this._fb.group({
      name : ['', Validators.required],
      rank : ['', Validators.required],
      description : ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if(this.data.type == 'update'){
      this.sliderForm.patchValue(this.data.data);
      this.selectedSliderImage = this.data.data.image
    }
  }

  onFileSelected() {
    this.selectedFile = ''
    this.isFileNotSelected = false;
    this.isFileValid = false;
    this.selectedFileName = '';
    const inputNode: any = document.querySelector(`#file`);
  
    if(inputNode.files[0].type.includes('image/webp')){
      const sliderFile = inputNode.files[0]
      this.isFileValid = true;
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
    if(this.sliderForm.valid){
      let obj={
        name: this.sliderForm.controls.name.value,
        rank: this.sliderForm.controls.rank.value,
        description: this.sliderForm.controls.description.value,
      }
      if(this.data.type === 'add'){    
        const formData =  new FormData();
        formData.append('name',obj.name );
        formData.append('image',this.selectedFile );
        formData.append('description',obj.description );
        formData.append('rank', obj.rank);

        this._sliderService.addSlider(formData).subscribe({
          next:(res:any)=>{
            this._coreServices.openSnackBar('Slider added successfully','done');
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
      formData.append('description',obj.description);
      formData.append('rank',obj.rank);
      this._sliderService.updateSlider(formData,this.data.data.id).subscribe({
        next:(res:any)=>{
          this._coreServices.openSnackBar('Slider update successfully','done');
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
