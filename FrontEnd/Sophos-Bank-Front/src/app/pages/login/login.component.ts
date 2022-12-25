import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  

  loginData={
    "email":"",
    "password":""
  }


  constructor(private snack: MatSnackBar,private loginService:LoginService){}

  ngOnInit():void{

  }


  formSubmit(){
    if (this.loginData.email.trim() == "" || this.loginData.email.length < 2  ){
          this.snack.open("El nombre de usuario es requerido!!! ", "Aceptar",{
            duration:3000
          })
        return
        }

        if (this.loginData.password.trim() == ""  ){
          this.snack.open("La contraseña es requerida!!! ", "Aceptar",{
            duration:3000
          })
        return
        }
        console.log(this.loginData)

        this.loginService.generateToken(this.loginData).subscribe(  
          (data:any)=>{
          console.log(data)
          },(error)=>{
            console.log(error)
          }

        )

  }




}
