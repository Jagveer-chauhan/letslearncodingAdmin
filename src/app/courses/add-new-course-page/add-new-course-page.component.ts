import { Component, OnInit ,ViewChild, Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CourseService } from 'app/core/services/course.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CoreService } from 'app/core/components/core.service';
import { CourseContent, ProjectPoint, Review } from 'app/core/interfaces/course';
import {  Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-new-course-page',
  templateUrl: './add-new-course-page.component.html',
  styleUrls: ['./add-new-course-page.component.scss']
})
export class AddNewCoursePageComponent implements OnInit {
  //section list
  projectPointList: any =[];
  courseContentList: any = []
  // faqList: any = []
  reviewList: any= [];

  //sub-heading point list
  coursecontentsubHeadingPointList: any = [];
  faqsubHeadingPointList: any = [];

  //courses list
  categoriesList: any = []
  coursePageDetails: FormGroup;


  courseContentObj :CourseContent
  // projectPoint: ProjectPoint
  // faqObj: CourseContent
  reviewObj: Review
  // pdfLink: string | undefined;
  selectedFileName: any;
  isFileValid: boolean = false;
  selectedFile: any;
  courseId: any;

  // imageList: any = []

  @ViewChild('coursepoint') coursePoint: any
  // @ViewChild('faqpoint') faqPoint: any

  //file
  selectedBannerFile: File | undefined;
  // selectedContentFile: File | undefined;
  // selectedCertificateFile: File | undefined;
  // selectedMobileBannerFile: File | undefined;

  isFileNotSelected: boolean;
  selectedBannerImage: SafeUrl;
  // selectedContentImage: SafeUrl;
  // selectedCertificateImage: SafeUrl;
  // selectedMobileBannerImage:SafeUrl;
  coursePageId: number = 0;

  coursePageUpdate: boolean = false
  constructor(
    private formBuilder: FormBuilder,
    public courseService: CourseService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router:Router,
    private coreService: CoreService
  ) { 
    this.coursePageDetails= this.formBuilder.group({
      category_id: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      tagline: new FormControl(null, Validators.required),
      heading: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      slug: new FormControl(null, Validators.required),
      // heading_for_mobile: new FormControl(null, Validators.required),
      // sub_heading_for_mobile: new FormControl(null, Validators.required),
      meta_title: new FormControl(null, Validators.required),
      meta_description: new FormControl(null, Validators.required),
      meta_keywords: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getCategoriesList()
    this.coursePageId = 0;
    //Dyanamic List of All Sections -- Create First entry
    this.addCourseContent();
    // this.addFaq();

    // this.projectPoint = new ProjectPoint()
    // this.projectPointList.push(this.projectPoint)

    this.reviewObj = new Review()
    this.reviewList.push(this.reviewObj);

    this.coursePageId =Number(this.route.snapshot.paramMap.get('id'))

      if(this.coursePageId){
        this.coursePageUpdate = true;
        this.courseService.getCoursePageDetails(this.coursePageId).subscribe({
          next:(res:any)=>{
            this.coursePageDetails.patchValue(res.data);
            // this.pdfLink = res.data.brouchureLink;
            // const course = this.categoriesList.filter(item=> item.id == res.data.category_id)
            this.courseId =res.data.institute_course_id ;
            // this.coursePageDetails.controls['courseId'].setValue(course[0].course_id);
            this.reviewList = res.data.reviews
            this.selectedBannerImage = res.data.image;
            // this.selectedContentImage = res.data.contentIimage;
            // this.selectedCertificateImage = res.data.certificateImage;
            // this.selectedMobileBannerImage = res.data.mobilebannerImage;

            // const projectsList = res.data.projects.split('&&')
            // this.projectPointList = []
            // projectsList.map(item=>{
            //   const obj =new ProjectPoint()
            //   obj.projectPoint = item;
            //   this.projectPointList.push(obj);
            // })
            
            this.courseContentList = []
            this.courseContentList = res.data.course_content;
            this.courseContentList.map(item=>{
              if(item.pointers){
                item['subHeadingPoints'] = item.pointers.split('&&')
              }
            })
            
            // this.faqList = []
            // this.faqList = res.data.faqs;            
            // this.faqList.map(item=>{
            //   if(item.pointers){
            //     item['subHeadingPoints'] = item.pointers.split('&&')
            //   }
            // })
          }
        })
      }
    
  }

  getCategoriesList(){
    this.courseService.getCategoriesList().subscribe({
      next:(res:any)=>{
        if(res.data.length>0){
          this.categoriesList = res.data;
        }else{
          console.log('Categories List error',res)
        }
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  addCourseContent() {
    this.courseContentObj = new CourseContent();
    
    // Set the initial position
    if (this.courseContentList.length === 0) {
      this.courseContentObj.rank = 1;
    } else {
      const lastItem = this.courseContentList[this.courseContentList.length - 1];
      this.courseContentObj.rank = Number(lastItem.rank) + 1;
    }
  
    this.courseContentList.push(this.courseContentObj);
  }

  // addFaq() {
  //   this.faqObj = new CourseContent();
  
  //   // Set the initial position
  //   if (this.faqList.length === 0) {
  //     this.faqObj.rank = 1;
  //   } else {
  //     const lastItem = this.faqList[this.faqList.length - 1];
  //     this.faqObj.rank = Number(lastItem.rank) + 1;
  //   }
  
  //   this.faqList.push(this.faqObj);
  // }



  addcourseContentSubHeadingPoints(input: HTMLInputElement, courseContent: CourseContent) {
    let point = input.value;
    if(point){
      if (!courseContent.subHeadingPoints) {
        courseContent.subHeadingPoints = [];
      }
      courseContent.subHeadingPoints.push(point);
      input.value = '';
    }
  }

  // addfaqSubHeadingPoints(input: HTMLInputElement, faqpoint: CourseContent){ 
  //   let point = input.value;  
  //   if(point){
  //     if (!faqpoint.subHeadingPoints) {
  //       faqpoint.subHeadingPoints = [];
  //     }
  //     faqpoint.subHeadingPoints.push(point);
  //     input.value = '';
  //   }
  // }

  removeCourseContentSubheadingPoint(courseContent: CourseContent, item: string) {
    if (courseContent.subHeadingPoints) {
      courseContent.subHeadingPoints = courseContent.subHeadingPoints.filter(
        (point) => point !== item
      );
    }
  }

  // removefaqSubheadingPoint(faqPoint: CourseContent,item:any){

  //   if (faqPoint.subHeadingPoints) {
  //     faqPoint.subHeadingPoints = faqPoint.subHeadingPoints.filter(
  //       (point) => point !== item
  //     );
  //   }
  // }

  // addProjectPoints(){   
  //   this.projectPoint = new ProjectPoint()
  //   this.projectPointList.push(this.projectPoint)
  // }

  // removeProjectPoint(element:any){
  //     this.projectPointList = this.projectPointList.filter(item=> item.projectPoint !== element.projectPoint)    
  // }

  addReview(){
    this.reviewObj = new Review;
    this.reviewList.push(this.reviewObj)
  }

  onFileSelected(str: string) {
    this.isFileNotSelected = false;
    const inputNode: any = document.querySelector(`#file${str}`);

    if (inputNode.files[0].type.includes('image/webp')) {
      const selectedFile = inputNode.files[0];

      if (str === 'banner') {
        this.selectedBannerFile = selectedFile;
        this.selectedBannerImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedBannerFile));
      }
      //  else if (str === 'content') {
      //   this.selectedContentFile = selectedFile;
      //   this.selectedContentImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedContentFile));
      // } else if (str === 'certificate') {
      //   this.selectedCertificateFile = selectedFile;
      //   this.selectedCertificateImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedCertificateFile));
      // }
      // else if (str === 'mobile_banner') {
      //   this.selectedMobileBannerFile = selectedFile;
      //   this.selectedMobileBannerImage = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedMobileBannerFile));
      // }

      inputNode.value = ''; // Clear the file input value
    } else {
      this.coreService.openSnackBar('please upload Image in WEBP exptension', 'Error')
    }
  }


  addCoursePage(coursePage: any){
    // console.log(coursePage)
    if(!this.selectedBannerFile)
    {
      this.coreService.openSnackBar('Please upload Banner Image','Error');
          return
    }
      //   this.coreService.openSnackBar('Please upload Banner Image','Error');
      //       return
      // }
    // this.imageList = [];
    // if(this.selectedBannerFile){
    //   if(this.selectedContentFile){
    //     if(this.selectedCertificateFile){
    //       if(this.selectedMobileBannerFile){
    //         this.imageList.push(this.selectedBannerFile)
    //         this.imageList.push(this.selectedContentFile)
    //         this.imageList.push(this.selectedCertificateFile)
    //         this.imageList.push(this.selectedMobileBannerFile)
    //       }else{
    //         this.coreService.openSnackBar('Please upload Mobile Banner Image','Error');
    //       return
    //       }
    //     }else{
    //       this.coreService.openSnackBar('Please upload Certificate Image','Error');
    //       return
    //     }
    //   }else{
    //     this.coreService.openSnackBar('PLease upload Content Image','Error');
    //       return
    //   }
    // }else{
    //   this.coreService.openSnackBar('Please upload Banner Image','Error');
    //       return
    // }
    this.courseContentList.map(item=>{console.log(item)

      if(item.subHeadingPoints.length > 0){
        item['pointers'] = item.subHeadingPoints.join('&&')
      }
    })
    
    const projectPointer =this.projectPointList.map(item=>item.projectPoint).join('&&')
    let formData = new FormData();
    formData.append('title',coursePage.title);
    formData.append('tagline',coursePage.tagline);
    formData.append('heading',coursePage.heading);
    formData.append('description',coursePage.description);
    formData.append('slug',coursePage.slug);
    formData.append('category_id',coursePage.category_id);
    formData.append('meta_title',coursePage.meta_title);
    formData.append('meta_description',coursePage.meta_description);
    formData.append('meta_keywords',coursePage.meta_keywords);
    formData.append('course_content',JSON.stringify(this.courseContentList));
    formData.append('reviews',JSON.stringify(this.reviewList));
    formData.append('file',this.selectedBannerFile)
    // let obj ={
    //   title: coursePage.title,
    //   description: coursePage.tagline,
    //   slug: coursePage.slug,
    //   // heading_for_mobile: coursePage.heading_for_mobile,
    //   // sub_heading_for_mobile: coursePage.sub_heading_for_mobile,
    //   // projects: projectPointer,x`
    //   image:"",
    //   category_id:coursePage.category_id,
    //   // sub_category_id:null,
    //   // lower_category_id:null,
    //   meta_title : coursePage.meta_title,
    //   meta_description  : coursePage.meta_description,
    //   meta_keywords : coursePage.meta_keywords,
    //   // courseid: coursePage.courseId,
    //   course_content: this.courseContentList,
    //   // faqs: this.faqList ,
    //   reviews: this.reviewList,
    // }
    // console.log(formData);
    this.courseService.addCoursePage(formData).subscribe({
      next:(res:any)=>{
        if(res.status == 200){
          // if(res.course_id){
            // const obj = new FormData();
            // this.imageList.forEach((item)=>{ obj.append('images', item)})
              // this.courseService.addImage(obj,res.course_id).subscribe({
              //   next:(res:any)=>{
              //     if(res.code == 200){
                  this.coreService.openSnackBar('Course Page Addedd Successfully', 'Done')
                  this.router.navigate(['/coursePage'])
              //     }
              //   }
              // })
          }
          else{
            this.coreService.openSnackBar('Something went wrong', 'Error')
          }
        // }
      },
      error:(err:any)=>{
        console.log('addcourse page error',err)
      }
    })
  }

  update_CourseDetail_Project_SEO_CONTENT(courseDetail:any){
    const projectPointer =this.projectPointList.map(item=>item.projectPoint).join('&&')

    // let obj={
    //   title:courseDetail.title,
    //   tagline: courseDetail.tagline,
    //   slug:courseDetail.slug,
    //   category_id:courseDetail.category_id,
    //   heading :courseDetail.heading,
    //   description: courseDetail.description,
    //   // heading_for_mobile:courseDetail.heading_for_mobile,
    //   // sub_heading_for_mobile:courseDetail.sub_heading_for_mobile,
    //   // projects:projectPointer,
    //   meta_title:courseDetail.meta_title,
    //   meta_description:courseDetail.meta_description,
    //   meta_keywords:courseDetail.meta_keywords,
    //   file:this.selectedBannerFile
    // }
    let formData = new FormData();
    formData.append('title',courseDetail.title);
    formData.append('tagline',courseDetail.tagline);
    formData.append('heading',courseDetail.heading);
    formData.append('description',courseDetail.description);
    formData.append('slug',courseDetail.slug);
    formData.append('category_id',courseDetail.category_id);
    formData.append('meta_title',courseDetail.meta_title);
    formData.append('meta_description',courseDetail.meta_description);
    formData.append('meta_keywords',courseDetail.meta_keywords);
    formData.append('file',this.selectedBannerFile)

    // console.log(obj);
    this.courseService.updateCourse(this.coursePageId,formData).subscribe({
      next:(res:any)=>{
        this.coreService.openSnackBar('Course Details Updates Successfully', 'Done')
        console.log(res);
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  update_CourseContent_or_Faq(str: any,card:any){
    let obj ={}
   if(str === 'courseContent'){
    obj = {
      rank: card.rank,
      heading: card.heading,
      description: card.description,
      sub_heading: card.sub_heading,
    }
    obj['pointers'] = card.subHeadingPoints.join('&&')
   }else if(str == 'faq'){
    obj = {
      rank : card.rank,
      heading: card.heading,
      description: card.description
    }
   }
    if(card.id){
      this.courseService.update_CourseContent_OR_FAQ(card.id, obj).subscribe({
        next:(res:any)=>{
          this.coreService.openSnackBar('Update Succesfully', 'Done');
        },
        error:(err:any)=>{
          this.coreService.openSnackBar('Something went wrong', 'Error');
        }
      })
    }else{
      obj['course_id'] = this.coursePageId
      if(str === 'courseContent'){
        this.courseService.add_CourseContent(obj).subscribe({
          next:(res:any)=>{
            if(res.status == 200){
              this.courseContentList.map(item=>{
                if(item.rank == obj['rank']){
                  item.id = res.course_content_id
                }
              })
              this.coreService.openSnackBar('New Accordian Added successfully')
              
            }
          },
          error:(err:any)=>{
            this.coreService.openSnackBar('Something went wrong', 'Error');
          }
        })
      }
      // if(str === 'faq'){
      //   this.courseService.add_Faq(obj).subscribe({
      //     next:(res:any)=>{
      //       if(res.status == 200){
      //         this.faqList.map(item=>{
      //           if(item.rank == obj['rank']){
      //             item.id = res.faq_id
      //           }
      //         })
      //       this.coreService.openSnackBar('New Faq addedd successfully', 'Done')
      //       }
      //     },
      //     error:(err:any)=>{
      //       this.coreService.openSnackBar('Something went wrong', 'Error')
      //     }
      //   })
      // }
    }
  }

  delete_CourseContent_OR_faq(str:string, obj:any){
    if(obj.id){
     this.courseService.delete_CourseContent_OR_FAQ(obj.id).subscribe({
        next:(res:any)=>{
          this.coreService.openSnackBar('Delete successfully', 'Done');
        },
        error:(err:any)=>{
          this.coreService.openSnackBar('Something went Wrong','Error')
        }
      })
    }
    // if(str === 'faq'){
    //   const index = this.faqList.indexOf(obj)
    //   this.faqList.splice(index,1)
    // }else{
      const index = this.courseContentList.indexOf(obj);
      this.courseContentList.splice(index, 1);
    // }
  }

  // updateImage(str:string){
  //   let obj = new FormData();
  //   if(str === 'banner_image'){
  //     obj.append('file', this.selectedBannerFile)
  //     obj.append('imageType', 'banner_image')
  //   }
  //   if(str === 'content_image'){
  //     obj.append('file', this.selectedContentFile)
  //     obj.append('imageType', 'content_image')
  //   }
  //   if(str === 'certificate_image'){
  //     obj.append('file', this.selectedCertificateFile)
  //     obj.append('imageType', 'certificate_imag')
  //   }
  //   if(str === 'mobile_banner_image'){
  //     obj.append('file', this.selectedMobileBannerFile)
  //     obj.append('imageType', 'mobile_banner_image')
  //   }

  //   obj.append('course_id',this.coursePageId.toString());
  //   this.courseService.updateCoursePageImages(obj).subscribe({
  //     next:(res:any)=>{
  //       this.coreService.openSnackBar('Update Successfully', 'Done')
  //     },
  //     error:(err:any)=>{
  //       this.coreService.openSnackBar('Somwthing went wrong', 'Error');
  //     }
  //   })

  // }

  updateReview(review:any){
    let obj ={
      name:review.name,
      description: review.description
    }
    if(review.id){
      this.courseService.updateCourseReview(review.id, obj).subscribe({
        next:(res:any)=>{
          this.coreService.openSnackBar('Updated Successfully', 'Done');
        },
        error:(err:any)=>{
          this.coreService.openSnackBar('Something went wrong', 'Done');
        }
      })
    }else{
      obj['course_id'] = this.coursePageId
      this.courseService.addCourseReview(obj).subscribe({
        next:(res:any)=>{
          if(res.status == 200){
            this.reviewList.map(item=>{
              if(item.description == obj['description'] && item.name == obj['name']){
                item.id = res.id
              }
            }) 
            this.coreService.openSnackBar('Updated Successfully', 'Done');
          }
        },
        error:(err:any)=>{

        }
      })
    }
  }

  deleteReview(review:any){
    if(review.id){
      this.courseService.deleteReview(review.id).subscribe({
        next:(res:any)=>{
          this.coreService.openSnackBar('Delete Successfully', 'Error');
        },
        error:(err:any)=>{
          this.coreService.openSnackBar('Something went wrong', 'Error')
        }
      })
    }

    const index = this.reviewList.indexOf(review);
    this.reviewList = this.reviewList.splice(index, 1)
  }

  // onPdfFileSelected(event: Event) {
  //   const inputNode: any = (event.target as HTMLInputElement);
  //   const file = inputNode.files[0];

  //   if (file && file.type.includes('application/pdf')) {
  //     this.isFileValid = true;
  //     this.selectedFile = file;
  //     this.selectedFileName = file.name;
  //     this.isFileNotSelected = false;
  //   } else {
  //     this.selectedFile = null;
  //     this.isFileValid = false;
  //     this.selectedFileName = '';
  //     this.isFileNotSelected = true;
  //   }
  // }

  // viewPdf() {
  //   if (this.selectedFile) {
  //     const pdfUrl = URL.createObjectURL(this.selectedFile);
  //     window.open(pdfUrl, '_blank');
  //   }
  // }

  // updateBrochure(){
  //   const formData = new FormData();
  //   formData.append('file',this.selectedFile);
  //   this.courseService.updateBrochure(formData,this.courseId).subscribe({
  //     next:(res:any )=>{
  //       this.coreService.openSnackBar('Brochre update successfully','done');
  //     },
  //     error:(err:any)=>{
  //       console.log('error');
  //     }
  //   })
  // }
}

