import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public user={
    name:"",
    lastName:"",
    birthDay:"",
    identificationType:"",
    identificationNumber:"",
    email:"",
    password:"",
    createdBy:this.loginService.getUser().username,
    role:""

  }

  
  constructor(private router:Router,private loginService:LoginService,private userService:UserService,private snack:MatSnackBar){}

  formSubmit(){
    
    if(this.user.name == '' || this.user.name == null || this.user.lastName == '' 
    || this.user.lastName == null || this.user.birthDay == '' || this.user.birthDay == null || 
    this.user.identificationType == '' || this.user.identificationType == null
    ||this.user.identificationNumber == '' || this.user.identificationNumber == null ||
    this.user.email == '' || this.user.email == null || this.user.password == '' || this.user.password == null||
    this.user.role == '' || this.user.role == null ){
      this.snack.open('All fields must be filled','Accept',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.userService.registerUser(this.user).subscribe((data)=>{
      
      Swal.fire('User Saved','User registered succesfully','success');
    },(error =>{
      
      if(error.status == "409"){
        this.snack.open('Client already exist on database','Accept',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        this.snack.open('You have to login','Accept',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }else{
        this.snack.open('Client name or lastname is less than 2 chars or does not have a valid email value or age is less than 18 years','Accept',{
          duration : 3000,
          });
      }
    })
    )
  
  }

}
