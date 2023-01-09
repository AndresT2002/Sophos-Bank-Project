import { Component, OnInit } from '@angular/core';
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
export class RegisterComponent implements OnInit{

  public user={
    name:"",
    lastName:"",
    birthDay:"",
    identificationType:"",
    identificationNumber:"",
    email:"",
    password:"",
    createdBy:"ADMIN",
    role:""

  }

  ngOnInit(): void {
    
  }
  constructor(private router:Router,private loginService:LoginService,private userService:UserService,private snack:MatSnackBar){}

  formSubmit(){
    console.log(this.user)
    if(this.user.name == '' || this.user.name == null || this.user.lastName == '' 
    || this.user.lastName == null || this.user.birthDay == '' || this.user.birthDay == null || 
    this.user.identificationType == '' || this.user.identificationType == null
    ||this.user.identificationNumber == '' || this.user.identificationNumber == null ||
    this.user.email == '' || this.user.email == null || this.user.password == '' || this.user.password == null ){
      this.snack.open('Todos los campos deben estar completos','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.userService.registerUser(this.user).subscribe((data)=>{
      console.log(data)
      Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
    },(error =>{
      console.log(error)
      if(error.status == "409"){
        this.snack.open('Client already exist on database','Aceptar',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        this.snack.open('You have to login','Aceptar',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }else{
        this.snack.open('Client name or lastname is less than 2 chars or does not have a valid email value or age is less than 18 years','Aceptar',{
          duration : 3000,
          });
      }
    })
    )
  
  }

}
