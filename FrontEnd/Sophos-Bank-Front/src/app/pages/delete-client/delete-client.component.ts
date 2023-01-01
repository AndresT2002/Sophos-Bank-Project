import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.css']
})
export class DeleteClientComponent {

  public identificationNumber={
    number:''
  }

  ngOnInit(): void {
    
  }
  constructor(private userService:UserService,private snack:MatSnackBar){}

  deleteClient(){
    console.log(this.identificationNumber)
    if(this.identificationNumber.number == '' || this.identificationNumber.number == null ){
      this.snack.open('El campo no puede estar vacío','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.userService.deleteClient(Number(this.identificationNumber.number)).subscribe((data)=>{
      console.log(data)
      Swal.fire('Usuario Eliminado','Usuario eliminado con exito en el sistema','success');
    },(error =>{
      console.log(error)
      this.snack.open('Error en la solicitud','Aceptar',{
        duration : 3000,
        
      });
    })
    )
  }
}
