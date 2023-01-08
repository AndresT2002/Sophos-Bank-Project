import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, startWith, map } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { ProductsService } from 'src/app/services/products.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import Swal from 'sweetalert2';
import { TransferComponent } from '../transfer/transfer.component';

@Component({
  selector: 'app-paydebt',
  templateUrl: './paydebt.component.html',
  styleUrls: ['./paydebt.component.css']
})
export class PaydebtComponent {
  constructor (private loginService:LoginService,private productService:ProductsService,@Inject(MAT_DIALOG_DATA) public dataObtained:any,private router:Router,private snack: MatSnackBar, private MatDialogRef:MatDialogRef<PaydebtComponent>,private transactionsService: TransactionsService){}

  public productPay={
    productNumber:this.dataObtained,
    value:"",
    productTo:"",
    modifiedBy:this.loginService.getUser().username,
    currentUser:this.loginService.getUser().id
  }

  productNumbers:any;
  

  myControl = new FormControl('');
  options: any[] =[]
  filteredOptions: Observable<any[]> | undefined;
  data:any;
  productNumbersArray:any

  ngOnInit() {
    
    this.productService.listClientProducts(this.productPay.currentUser).subscribe((dataObtained)=>{
      this.data=[]

      this.data.push(dataObtained)
      

      
      this.data=this.data[0].filter((element:any) => element.status == "Active")
      
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
    this.productPay.productTo=value[0]
    console.log(value)
    
    return
  }


  ngOnDestroy():void{
    this.MatDialogRef.close(this.dataObtained)
    
  }

  onCloseClick():void{
    this.MatDialogRef.close()
  }


  payDebt(){
    console.log(this.dataObtained)
    

    if(this.productPay.productNumber == '' || this.productPay.productNumber == null || this.productPay.value == '' 
    || this.productPay.value == null ||  this.productPay.productTo == '' || this.productPay.productTo == null){
      this.snack.open('Todos los campos deben estar completos','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }
    
    this.transactionsService.payDebt(Number(this.productPay.productNumber),Number(this.productPay.productTo),Number(this.productPay.value),this.productPay.modifiedBy).subscribe((data)=>{
      console.log(data)
      Swal.fire('Payment complete','Paymen operation was succesful','success');
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
