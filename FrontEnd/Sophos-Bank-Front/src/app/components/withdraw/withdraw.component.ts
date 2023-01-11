import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import Swal from 'sweetalert2';
import { DepositComponent } from '../deposit/deposit.component';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent {
  constructor (private loginService:LoginService,@Inject(MAT_DIALOG_DATA) public dataObtained:any,private router:Router,private snack: MatSnackBar, private MatDialogRef:MatDialogRef<DepositComponent>,private transactionsService: TransactionsService){}

  public productWithdraw={
    productNumber:this.dataObtained,
    value:"",
    modifiedBy:this.loginService.getUser().username
  }

 

  ngOnDestroy():void{
    this.MatDialogRef.close(this.dataObtained)
    
  }

  onCloseClick():void{
    this.MatDialogRef.close()
  }

  withdraw(){
   
    if(this.productWithdraw.productNumber == '' || this.productWithdraw.productNumber == null || this.productWithdraw.value == '' 
    || this.productWithdraw.value == null  ){
      this.snack.open('All fields must be filled','Accept',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.transactionsService.withdraw(Number(this.productWithdraw.productNumber),Number(this.productWithdraw.value),this.productWithdraw.modifiedBy).subscribe((data)=>{
      
      Swal.fire('Withdraw completed','Withdraw operation was succesful','success');
      window.location.reload();
    },(error =>{
      
      if(error.status == "404"){
        this.snack.open('Product to withdraw not found','Accept',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        this.snack.open('You have to login','Accept',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }else{
        this.snack.open('Your product does not have enough money to withdraw that value or product is inactive','Accept',{
          duration : 3000,
          });
      }
    })
    )
  
  }


}
