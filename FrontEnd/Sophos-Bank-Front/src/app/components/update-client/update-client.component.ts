import { Component,Inject } from '@angular/core';
import  {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent{
  constructor (private loginService:LoginService,@Inject(MAT_DIALOG_DATA) public dataObtained:any,private router:Router,private snack: MatSnackBar, private MatDialogRef:MatDialogRef<UpdateClientComponent>,private userService: UserService){}


  public client={
    id:this.dataObtained.id,
    name:this.dataObtained.name,
    lastName:this.dataObtained.lastName,
    identificationType:this.dataObtained.identificationType,
    identificationNumber:this.dataObtained.identificationNumber,
    email:this.dataObtained.email,
    password:this.dataObtained.password,
    modifiedBy:this.loginService.getUser().username
    

  }
 

  ngOnDestroy():void{
    this.MatDialogRef.close(this.dataObtained)
    
  }

  onCloseClick():void{
    this.MatDialogRef.close()
  }

  formUpdate(){  

    if(this.client.name == '' || this.client.name == null || this.client.lastName == '' 
    || this.client.lastName == null ||  
    this.client.identificationType == '' || this.client.identificationType == null
    ||this.client.identificationNumber == '' || this.client.identificationNumber == null ||
    this.client.email == '' || this.client.email == null || this.client.password == '' || this.client.password == null ){
      this.snack.open('All fields must be filled','Accept',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.userService.updateClient(this.client).subscribe((data)=>{
      
      Swal.fire('User updated','User updated successfully','success');
      window.location.reload();
    },(error =>{
      console.log(error)
      if(error.status == "404"){
        this.snack.open('Client to update not found','Accept',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        this.snack.open('You have to login','Accept',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }else{
        this.snack.open('Error on petition','Accept',{
          duration : 3000,
          });
      }
    })
    )
  
  }

}
