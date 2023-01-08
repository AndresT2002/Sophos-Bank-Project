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
import { DepositComponent } from '../deposit/deposit.component';

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

  productNumbers:any;
  

  myControl = new FormControl('');
  options: any[] =[]
  filteredOptions: Observable<any[]> | undefined;
  data:any;
  productNumbersArray:any

  ngOnInit() {

    this.productService.listAllProducts().subscribe((dataObtained)=>{
      this.data=dataObtained
      
      this.productNumbersArray=[]
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        let number=element.productNumber.toString()
      
        this.productNumbersArray.push(number)
      }
      
      this.options=this.productNumbersArray
      console.log(this.options)
      
    }
    )

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
            map(term => this._filter(term || '')),
    );

  } 

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.includes(filterValue));;
  }

  updateMySelection(productNumber:string){
    let value=this._filter(productNumber)
    this.productTransfer.productTo=value[0]
    console.log(value)
    
    return
  }


  ngOnDestroy():void{
    this.MatDialogRef.close(this.dataObtained)
    
  }

  onCloseClick():void{
    this.MatDialogRef.close()
  }

  transfer(){
    console.log(this.dataObtained)
    

    if(this.productTransfer.productNumber == '' || this.productTransfer.productNumber == null || this.productTransfer.value == '' 
    || this.productTransfer.value == null ||  this.productTransfer.productTo == '' || this.productTransfer.productTo == null){
      this.snack.open('Todos los campos deben estar completos','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }
    console.log(this.productTransfer)
    this.transactionsService.transfer(Number(this.productTransfer.productNumber),Number(this.productTransfer.productTo),Number(this.productTransfer.value),this.productTransfer.modifiedBy).subscribe((data)=>{
      console.log(data)
      Swal.fire('Transfer completed','Transfer operation was succesful','success');
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
