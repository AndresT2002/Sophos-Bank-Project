import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UpdateClientComponent } from 'src/app/components/update-client/update-client.component';
import { Router } from '@angular/router';
import { ListProductsComponent } from '../list-products/list-products.component';
import { ListProductsAdminComponent } from 'src/app/components/list-products-admin/list-products-admin.component';

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
  columndefs : any[] = ['name','email','birthDay','createdAt','identificationType','identificationNumber','deleteClient','updateClient','listProducts'];
  data:any;
  constructor(private adminService:AdminServiceService,private router:Router, private userService: UserService,private snack: MatSnackBar,
    private matDialog:MatDialog){}
  

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
      window.location.reload();
    },(error =>{
      console.log(error)
      this.snack.open('Error en la solicitud','Aceptar',{
        duration : 3000,
        
      });
    })
    )
  }

  onOpenUpdateDialog(client:any){

    let dialogRef=this.matDialog.open(UpdateClientComponent,{
      data:client,
      
      hasBackdrop:true
    })

    dialogRef.afterClosed().subscribe(result =>{
      
    })



  }

  onOpenListProductsDialog(client:any){

    let dialogRef=this.matDialog.open(ListProductsAdminComponent,{
      data:client,
      disableClose:true,
      hasBackdrop:true
    })
    
    dialogRef.afterClosed().subscribe(result =>{
      
    })



  }


}
