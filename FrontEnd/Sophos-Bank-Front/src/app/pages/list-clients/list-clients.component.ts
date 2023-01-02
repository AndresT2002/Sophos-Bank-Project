import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent {
  
  public user={
    name:"",
    lastName:"",
    birthDay:"",
    identificationType:"",
    identificationNumber:"",
    email:"",

  }
  columndefs : any[] = ['name','email','birthDay','createdAt','identificationNumber','deleteClient'];
  data:any;
  constructor(private adminService:AdminServiceService, private userService: UserService,private snack: MatSnackBar){}
  

  ngOnInit():void{
    this.adminService.listClients().subscribe((dataObtained)=>{
      this.data=dataObtained
      console.log(this.data)
    }
    )
    
  }







  deleteClient(identificationNumber: String){
    

    this.userService.deleteClient(Number(identificationNumber)).subscribe((data)=>{
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
