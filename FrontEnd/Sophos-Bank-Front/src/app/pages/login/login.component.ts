import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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


  constructor(private snack: MatSnackBar,private loginService:LoginService,private router:Router){}

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
          this.loginService.loginUser(data.token)
          this.loginService.getCurrentUser().subscribe((user:any)=>{
            this.loginService.setUser(user);
            console.log(user)
            if(user.role=="ADMIN"){
              this.router.navigate(["/admin"])
              this.loginService.loginStatusSubject.next(true);
            }else if (user.role=="CLIENT"){
              this.router.navigate(["/user-dashboard"]) 
              this.loginService.loginStatusSubject.next(true);
            }else{
              this.loginService.logout()
            }


          })
          },(error)=>{
            console.log(error)
            this.snack.open("Detalles invalidos,vuelva a intentar !!", "Aceptar",{
              duration:3000
            })
          }

        )

  }




}
