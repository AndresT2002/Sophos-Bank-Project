import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import Swal from 'sweetalert2';
import { DepositComponent } from '../deposit/deposit.component';

@Component({
  selector: 'app-overdraft',
  templateUrl: './overdraft.component.html',
  styleUrls: ['./overdraft.component.css']
})
export class OverdraftComponent {
  constructor (private loginService:LoginService,@Inject(MAT_DIALOG_DATA) public dataObtained:any,private router:Router,private snack: MatSnackBar, private MatDialogRef:MatDialogRef<OverdraftComponent>,private transactionsService: TransactionsService){}

  public productOverdraft={
    productNumber:this.dataObtained,
    value:"",
    modifiedBy:this.loginService.getUser().username
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy():void{
    this.MatDialogRef.close(this.dataObtained)
    
  }

  onCloseClick():void{
    this.MatDialogRef.close()
  }

  overdraft(){
    
    if(this.productOverdraft.productNumber == '' || this.productOverdraft.productNumber == null || this.productOverdraft.value == '' 
    || this.productOverdraft.value == null  ){
      this.snack.open('All fields must be filled','Accept',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.transactionsService.overdraft(Number(this.productOverdraft.productNumber),Number(this.productOverdraft.value),this.productOverdraft.modifiedBy).subscribe((data)=>{
      
      Swal.fire('Overdraft completed','Overdraft operation was succesful','success');
      window.location.reload();
    },(error =>{
      
      if(error.status == "404"){
        this.snack.open('Product to overdraft not found','Accept',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        this.snack.open('You have to login','Accept',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }
      else{
        this.snack.open('The maximum value to overdraft is 3 Million','Accept',{
          duration : 3000,
          });
      }
    })
    )
  
  }
}
