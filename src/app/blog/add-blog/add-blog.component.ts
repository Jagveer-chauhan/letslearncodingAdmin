import { ThisReceiver } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreService } from 'app/core/components/core.service';
// import { subTitleList } from 'app/core/interfaces/blog';
import { CourseContent } from 'app/core/interfaces/course';
import { BlogService } from 'app/core/services/blog.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss']
})
export class AddBlogComponent implements OnInit {

  blogForm : FormGroup;
  srcResult: any;
  selectedFile: any;
  selectedFileName: any;
  isFileNotSelected: boolean = false;
  isFileValid: boolean = false;
  // subTitleList : any = [];

  // subTitleObj : subTitleList;
  selectedImage: SafeUrl;
  blogUpdate: boolean = false
  blogId: any;
  public Editor = ClassicEditor;
  
  constructor(private _fb:FormBuilder, 
    public _blogService: BlogService, 
    public _coreServices : CoreService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router:Router
    ) {
    this.blogForm = this._fb.group({
      title : ['', Validators.required],
      slug : ['', Validators.required],
      description : ['', Validators.required],
      meta_title : ['', Validators.required],
      meta_description : ['', Validators.required],
      meta_keywords : ['', Validators.required],
    });
   }
  ngOnInit(): void {
    // if(this.data.type == 'update'){
    //   this.blogForm.patchValue(this.data.data);
    // }

  //  this.addSubTitle()
   this.blogUpdate = false;
   this.blogId = this.route.snapshot.paramMap.get('id')
    if(this.blogId){
      this.blogUpdate = true;
      this._blogService.getBlogByID(this.blogId).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.blogForm.patchValue(res.data)
          // this.subTitleList = res.data.subHeadings
          // this.subTitleList.map(item=>{
          //   item['subHeadingPoints'] = item.description.split('&&')
          // })
          this.selectedImage = res.data.image
        },
        error:(err:any)=>{
          console.log(err);
        }
      })
    }

  }

  onFileSelected() {
    this.selectedFile = ''
    this.isFileNotSelected = false;
    this.isFileValid = false;
    this.selectedFileName = '';
    const inputNode: any = document.querySelector('#file');
  
    if(inputNode.files[0].type.includes('image/webp')){
      this.isFileValid = true;
      this.selectedFile = inputNode.files[0];
      this.selectedFileName = this.selectedFile?.name;
      this.selectedImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFile));

    }else{
      this._coreServices.openSnackBar('Please upload in webp format', 'Error');
    }
  }

  addBlog(blogForm:any){
    if(this.selectedFile){
      this.isFileNotSelected = false;
    }else{
      return this.isFileNotSelected = true;        
    }
    if(this.blogForm.valid ){
      let obj = new FormData()
      obj.append('title', blogForm.title)
      obj.append('slug', blogForm.slug)
      obj.append('description', blogForm.description)
      obj.append('meta_title', blogForm.meta_title)
      obj.append('meta_description', blogForm.meta_description)
      obj.append('meta_keywords', blogForm.meta_keywords)
      obj.append('file', this.selectedFile)
      // if(this.subTitleList.length > 0){
      //   for(let i = 0; i<this.subTitleList.length; i++){
      //     const rankKey = 'subHeading[' + i + '][rank]'  
      //     obj.append(rankKey,this.subTitleList[i].rank )
      //     const titleKey = 'subHeading[' + i + '][title]'  
      //     obj.append(titleKey,this.subTitleList[i].title )
      //     const descriptionKey = 'subHeading[' + i + '][description]'  
      //     obj.append(descriptionKey,this.subTitleList[i].subHeadingPoints.join('&&') )
      //   }}
        this._blogService.addBlog(obj).subscribe({
          next:(res:any)=>{
            this._coreServices.openSnackBar('Blog Add Successfully', 'Done')
            this.router.navigate(['/blog'])
          },
          error:(err:any)=>{
              this._coreServices.openSnackBar('Something went wrong', 'Error')
          }
        })
    }

    
  }

  // addSubTitlePoints(input: HTMLInputElement, subTitleList: subTitleList){
  //   let point = input.value;
  //   if(!subTitleList.subHeadingPoints){
  //     subTitleList.subHeadingPoints = [];
  //   }
  //   subTitleList.subHeadingPoints.push(point);
  //   input.value = '';
  // }

  // removeSubTitlePoint(subTitleList: subTitleList, item: string){
  //   if(subTitleList.subHeadingPoints){
  //     subTitleList.subHeadingPoints = subTitleList.subHeadingPoints.filter(
  //       (point) => point !== item
  //     );
  //   }
  // }

 

  // addSubTitle(){
  //   this.subTitleObj = new subTitleList()
  //   if (this.subTitleList.length === 0) {
  //     this.subTitleObj.rank = 1;
  //   } else {
  //     const lastItem = this.subTitleList[this.subTitleList.length - 1];
  //     this.subTitleObj.rank = Number(lastItem.rank) + 1;
  //   }
  //   this.subTitleList.push(this.subTitleObj);
  // }

  // updateSubTitleCard(obj:any){
  //   obj['blog_id'] = this.blogId
  //   obj['description'] = obj.subHeadingPoints.join('&&');
  //   if(obj.id){
    
  //   this._blogService.updateBlogSubHeading(obj).subscribe({
  //     next:(res:any)=>{
  //       this._coreServices.openSnackBar('Sub Heading Update Successfully','Done')
  //     },
  //     error:(err:any)=>{
  //       this._coreServices.openSnackBar('Something went wrong', 'Error');
  //     }
  //   })}
  //   else{
  //     this._blogService.addBlogSubHeading(obj).subscribe({
  //       next:(res:any)=>{
  //         this.subTitleList.map(item=>{
  //           if(item.rank == obj['rank']){
  //             item.id = res.id
  //           }
  //         })
  //         this._coreServices.openSnackBar('New section addedd successfully', 'Done')
  //       },
  //       error:(err:any)=>{
  //         this._coreServices.openSnackBar('Something went wrong', 'Error');
  //       }
  //     })
  //   }
  // }

  updateBlogDetails(blogForm:any){
    // let obj={
      
    //     title:blogForm.title,
    //     slug:blogForm.slug,
    //     description:blogForm.description,
    //     meta_title:blogForm.meta_title,
    //     meta_description:blogForm.meta_description,
    //     meta_keywords:blogForm.meta_keywords
    // }
    let obj = new FormData()
      obj.append('title', blogForm.title)
      obj.append('slug', blogForm.slug)
      obj.append('description', blogForm.description)
      obj.append('meta_title', blogForm.meta_title)
      obj.append('meta_description', blogForm.meta_description)
      obj.append('meta_keywords', blogForm.meta_keywords)
      obj.append('file', this.selectedFile)
    this._blogService.updateBlog(obj,this.blogId).subscribe({
      next:(res:any)=>{
        this._coreServices.openSnackBar('Blog Details Update Successfully', 'Done')
        this.router.navigate(['/blog'])
      },
      error:(err:any)=>{
        this._coreServices.openSnackBar('Something went wrong', 'Error');
      }
    })
  }

  // updateBlogImage(){
  //   const obj = new FormData()
  //   obj.append('id', this.blogId)
  //   obj.append('file', this.selectedFile);
  //   this._blogService.updateBlogImage(obj).subscribe({
  //     next:(res:any)=>{
  //       this._coreServices.openSnackBar('Image Update Successfully', 'Done')
  //     },
  //     error:(err:any)=>{
  //       this._coreServices.openSnackBar('Somwthing went wrong', 'Error');
  //     }
  //   })
  // }

  // removeSubTitleCard(obj:any){
  //   if(obj.id){
  //     this._blogService.removeSubTitleCard(obj.id).subscribe({
  //       next:(res:any)=>{
  //         this._coreServices.openSnackBar('Delete Successfully', 'Done')
  //       },
  //       error:(err:any)=>{
  //         this._coreServices.openSnackBar('Something went wrong', 'Error')
  //       }
  //     })
  //   }

  //   const index = this.subTitleList.indexOf(obj)
  //   if(index){
  //     this.subTitleList.splice(index, 1);
  //   }
  // }
}
