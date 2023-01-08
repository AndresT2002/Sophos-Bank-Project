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
    console.log(this.dataObtained)
    

    if(this.productOverdraft.productNumber == '' || this.productOverdraft.productNumber == null || this.productOverdraft.value == '' 
    || this.productOverdraft.value == null  ){
      this.snack.open('Todos los campos deben estar completos','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.transactionsService.overdraft(Number(this.productOverdraft.productNumber),Number(this.productOverdraft.value),this.productOverdraft.modifiedBy).subscribe((data)=>{
      console.log(data)
      Swal.fire('Overdraft completed','Overdraft operation was succesful','success');
      window.location.reload();
    },(error =>{
      console.log(error)
      this.snack.open('Error on petition','Accept',{
        duration : 3000,
        
      });
    })
    )
  
  }
}
