import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    createdBy:"user"

  }

  ngOnInit(): void {
    
  }
  constructor(private userService:UserService,private snack:MatSnackBar){}

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

    this.userService.registrarUsuario(this.user).subscribe((data)=>{
      console.log(data)
      Swal.fire('Usuario guardado','Usuario registrado con exito en el sistema','success');
    },(error =>{
      console.log(error)
      this.snack.open('Error en la solicitud','Aceptar',{
        duration : 3000,
        
      });
    })
    )
  
  }

}
