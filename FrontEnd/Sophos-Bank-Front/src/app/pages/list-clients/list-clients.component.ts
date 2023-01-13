import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UpdateClientComponent } from 'src/app/components/update-client/update-client.component';
import { Router } from '@angular/router';

import { ListProductsAdminComponent } from 'src/app/components/list-products-admin/list-products-admin.component';
import { LoginService } from 'src/app/services/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { Client, UpdateClient } from 'src/app/components/interfaces';

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
  columndefs : string[] = ['name','lastName','email','birthDay','createdAt','createdBy','modifiedBy','modifiedAt','identificationType','identificationNumber','deleteClient','updateClient','listProducts'];
  data:Array<Client>;

  constructor(private loginService:LoginService,private adminService:AdminServiceService,private router:Router, private userService: UserService,private snack: MatSnackBar,
    private matDialog:MatDialog){}
  displayedColumns=this.columndefs
  dataSource:any


  ngOnInit():void{
    this.adminService.listClients().subscribe((dataObtained)=>{
      this.data=dataObtained
      
      this.dataSource = new MatTableDataSource(this.data);

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







  deleteClient(identificationNumber: string){
    

    this.userService.deleteClient(Number(identificationNumber)).subscribe((data)=>{
      
      Swal.fire('User deleted','User deleted succesfully','success');
      window.location.reload();
    },(error =>{
      
      if(error.status == "404"){
        this.snack.open('Client not found','Accept',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        this.snack.open('You have to login','Accept',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }else{
        this.snack.open('Client has at least one product without being cancelled','Accept',{
          duration : 3000,
          });
      }
    })
    )
  }
  

    
  onOpenUpdateDialog(client:UpdateClient){

    let dialogRef=this.matDialog.open(UpdateClientComponent,{
      data:client,
      height: '85%',
      width: '60%',
      hasBackdrop:true
    })

    dialogRef.afterClosed().subscribe(result =>{
      
    })



  }

  onOpenListProductsDialog(client:Client){

    let dialogRef=this.matDialog.open(ListProductsAdminComponent,{
      data:client,
      height: '80%',
      width: '90%',
      hasBackdrop:true
    })
    
    dialogRef.afterClosed().subscribe(result =>{
      
    })



  }


}
