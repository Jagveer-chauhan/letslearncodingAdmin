import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CoreService } from 'app/core/components/core.service';
import { IRLogin } from 'app/core/interfaces/login';
import { AuthService } from 'app/core/services/auth.service';
import { LoginService } from 'app/core/services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  title = 'material-login';
  visible:boolean = true;
  changeType:boolean = true;

  constructor(
    private router:Router, 
    public loginService : LoginService,
    public _coreServices: CoreService,
    private authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email,]),
      password: new FormControl('', [Validators.required,])
    });
   }
// ,Validators.pattern(  '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',  )
// Validators.pattern(  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'  )
  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.loginForm.valid){
      return;
    }
      let obj={
        email : this.loginForm.controls.email.value,
        password : this.loginForm.controls.password.value
      };
      this.loginService.logIn(obj).subscribe({
        next : (res:IRLogin)=>{
          if(res.token){
            this.authService.setToken(res);
            this.router.navigate(['/dashboard']);
            this._coreServices.openSnackBar('Login successfully','done');
          }
        },
        error : (err:any)=>{
          this._coreServices.openSnackBar(err.message);
          console.log(err);
        }
      })
    
  }

  viewpass(){
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

}
