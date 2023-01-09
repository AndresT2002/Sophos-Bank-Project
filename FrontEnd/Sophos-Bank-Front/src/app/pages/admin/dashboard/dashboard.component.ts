import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DepositComponent } from 'src/app/components/deposit/deposit.component';
import { UpdateClientComponent } from 'src/app/components/update-client/update-client.component';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import { CreateProductComponent } from '../../create-product/create-product.component';
import { DeleteClientComponent } from '../../delete-client/delete-client.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  currentUser:any
constructor(private adminService:AdminServiceService,private router:Router, private userService: UserService,private snack: MatSnackBar,
    private matDialog:MatDialog, private loginService:LoginService){}
    
  onOpenUpdateDialog(){
    this.currentUser=this.loginService.getCurrentUser().subscribe(userObtained =>{
      this.currentUser=userObtained
      console.log(this.currentUser)

      let userData=this.userService.getUserById(Number(this.currentUser.id)).subscribe(dataObtained =>{


        let dialogRef=this.matDialog.open(UpdateClientComponent,{
          data:dataObtained,
          
          hasBackdrop:true
        })
    
        dialogRef.afterClosed().subscribe(result =>{
          
        })

      })

      
    })

    



  }

  onOpenDepositDialog(){
    
    let dialogRef=this.matDialog.open(DepositComponent,{
      data:null,
      
      hasBackdrop:true
    })
    
    dialogRef.afterClosed().subscribe(result =>{
      
    })

  }

  onOpenDeleteClientDialog(){

    let dialogRef=this.matDialog.open(DeleteClientComponent,{
         
      hasBackdrop:true
    })
    
    dialogRef.afterClosed().subscribe(result =>{
      
    })

  }

  onOpenCreateProductDialog(){

    let dialogRef=this.matDialog.open(CreateProductComponent,{
         
      hasBackdrop:true
    })
    
    dialogRef.afterClosed().subscribe(result =>{
      
    })

  }

}
