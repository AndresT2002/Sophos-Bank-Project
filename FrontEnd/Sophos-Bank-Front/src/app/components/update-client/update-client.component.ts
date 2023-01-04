import { Component,Inject, OnInit } from '@angular/core';
import  {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit{
  constructor (@Inject(MAT_DIALOG_DATA) public dataObtained:any,private router:Router,private snack: MatSnackBar, private MatDialogRef:MatDialogRef<UpdateClientComponent>,private userService: UserService){}


  public client={
    id:this.dataObtained.id,
    name:this.dataObtained.name,
    lastName:this.dataObtained.lastName,
    identificationType:this.dataObtained.identificationType,
    identificationNumber:this.dataObtained.identificationNumber,
    email:this.dataObtained.email,
    password:this.dataObtained.password

  }


  ngOnInit(): void {
    
  }

  ngOnDestroy():void{
    this.MatDialogRef.close(this.dataObtained)
    
  }

  onCloseClick():void{
    this.MatDialogRef.close()
  }

  formUpdate(){
    console.log(this.client)
    

    if(this.client.name == '' || this.client.name == null || this.client.lastName == '' 
    || this.client.lastName == null ||  
    this.client.identificationType == '' || this.client.identificationType == null
    ||this.client.identificationNumber == '' || this.client.identificationNumber == null ||
    this.client.email == '' || this.client.email == null || this.client.password == '' || this.client.password == null ){
      this.snack.open('Todos los campos deben estar completos','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.userService.updateClient(this.client).subscribe((data)=>{
      console.log(data)
      Swal.fire('Usuario actualizado','Usuario actualizado con exito en el sistema','success');
      window.location.reload();
    },(error =>{
      console.log(error)
      this.snack.open('Error en la solicitud','Aceptar',{
        duration : 3000,
        
      });
    })
    )
  
  }

}
