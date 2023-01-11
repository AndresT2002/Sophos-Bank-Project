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
  
  
  ngOnInit(){
    if(!this.loginService.isLoggedIn()){
      this.loginService.logout()
      this.router.navigate(["/login"]) 
    }
  }

  currentUser:any
constructor(private adminService:AdminServiceService,private router:Router, private userService: UserService,private snack: MatSnackBar,
    private matDialog:MatDialog, private loginService:LoginService){}
    
  onOpenUpdateDialog(){
    this.currentUser=this.loginService.getCurrentUser().subscribe(userObtained =>{
      this.currentUser=userObtained
      console.log(this.currentUser)

      this.userService.getUserById(Number(this.currentUser.id)).subscribe(dataObtained =>{


        let dialogRef=this.matDialog.open(UpdateClientComponent,{
          data:dataObtained,
          height: '70%',
          width: '40%',
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
      height: '50%',
      width: '40%',
      hasBackdrop:true
    })
    
    dialogRef.afterClosed().subscribe(result =>{
      
    })

  }

  onOpenCreateProductDialog(){

    let dialogRef=this.matDialog.open(CreateProductComponent,{
      height: '70%',
      width: '40%',
      hasBackdrop:true
    })
    
    dialogRef.afterClosed().subscribe(result =>{
      
    })

  }

}
