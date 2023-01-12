import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { ProductsService } from 'src/app/services/products.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import Swal from 'sweetalert2';
import { Product } from '../interfaces';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent {
  constructor (private loginService:LoginService,private productService:ProductsService,@Inject(MAT_DIALOG_DATA) public dataObtained:any,private router:Router,private snack: MatSnackBar, private MatDialogRef:MatDialogRef<TransferComponent>,private transactionsService: TransactionsService){}

  public productTransfer={
    productNumber:this.dataObtained,
    value:"",
    productTo:"",
    modifiedBy:this.loginService.getUser().username
  }

  
  

  myControl = new FormControl('');
  options: string[] =[]
  filteredOptions: Observable<string[]> | undefined;
  data:Array<Product>=[];
  productNumbersArray:Array<string> = []

  ngOnInit() {

    this.productService.listAllProducts().subscribe((dataObtained)=>{
      this.data=dataObtained
            
      for(let value of this.data){
        this.options.push(value.productNumber.toString())
      }
    
      
    }
    )

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
            map(term => this._filter(term || '')),
    );

  } 

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.includes(filterValue));;
  }

  updateMySelection(productNumber:string){
    let value=this._filter(productNumber)
    this.productTransfer.productTo=value[0]

  }


  ngOnDestroy():void{
    this.MatDialogRef.close(this.dataObtained)
    
  }

  onCloseClick():void{
    this.MatDialogRef.close()
  }

  transfer(){
    if(this.productTransfer.productNumber == '' || this.productTransfer.productNumber == null || this.productTransfer.value == '' 
    || this.productTransfer.value == null ||  this.productTransfer.productTo == '' || this.productTransfer.productTo == null){
      this.snack.open('All fields must be filled','Accept',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }
    
    this.transactionsService.transfer(Number(this.productTransfer.productNumber),Number(this.productTransfer.productTo),Number(this.productTransfer.value),this.productTransfer.modifiedBy).subscribe((data)=>{
      
      Swal.fire('Transfer completed','Transfer operation was successful','success');
      window.location.reload();
    },(error =>{
      
      if(error.status == "404"){
        this.snack.open('Product to deposit or product from  not found','Accept',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        this.snack.open('You have to login','Accept',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }else{
        this.snack.open('Your product does not have enough money to transfer that value','Accept',{
          duration : 3000,
          });
      }
    })
    )
  
  }
}
