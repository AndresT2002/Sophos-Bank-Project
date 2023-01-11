import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UpdateClientComponent } from 'src/app/components/update-client/update-client.component';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

currentUser:any
constructor(private adminService:AdminServiceService,private router:Router, private userService: UserService,private snack: MatSnackBar,
    private matDialog:MatDialog, private loginService:LoginService){}

  onOpenUpdateDialog(){
    this.currentUser=this.loginService.getCurrentUser().subscribe(userObtained =>{
      this.currentUser=userObtained
      

      this.userService.getUserById(Number(this.currentUser.id)).subscribe(dataObtained =>{


        let dialogRef=this.matDialog.open(UpdateClientComponent,{
          data:dataObtained,
          height: '85%',
          width: '60%',
          hasBackdrop:true
        })
    
        dialogRef.afterClosed().subscribe(result =>{
          
        })

      })

      
    })

    



  }
}
