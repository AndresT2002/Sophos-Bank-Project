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
import { LoginService } from 'src/app/services/login.service';

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
  columndefs : any[] = ['name','email','birthDay','createdAt','modifiedBy','modifiedAt','identificationType','identificationNumber','deleteClient','updateClient','listProducts'];
  data:any;
  constructor(private loginService:LoginService,private adminService:AdminServiceService,private router:Router, private userService: UserService,private snack: MatSnackBar,
    private matDialog:MatDialog){}
  

  ngOnInit():void{
    this.adminService.listClients().subscribe((dataObtained)=>{
      this.data=dataObtained
      
    },(error =>{
      if(error.status=="401"){
       
        this.snack.open('You have to login','Accept',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }
    }
    )
    )
  }







  deleteClient(identificationNumber: String){
    

    this.userService.deleteClient(Number(identificationNumber)).subscribe((data)=>{
      
      Swal.fire('User deleted','User deleted succesfuly','success');
      window.location.reload();
    },(error =>{
      
      this.snack.open('Error doing the request','Accept',{
        duration : 3000,
        
      });
    })
    )
  }

  onOpenUpdateDialog(client:any){

    let dialogRef=this.matDialog.open(UpdateClientComponent,{
      data:client,
      height: '70%',
      width: '60%',
      hasBackdrop:true
    })

    dialogRef.afterClosed().subscribe(result =>{
      
    })



  }

  onOpenListProductsDialog(client:any){

    let dialogRef=this.matDialog.open(ListProductsAdminComponent,{
      data:client,
      height: '100%',
      width: '90%',
      hasBackdrop:true
    })
    
    dialogRef.afterClosed().subscribe(result =>{
      
    })



  }


}
