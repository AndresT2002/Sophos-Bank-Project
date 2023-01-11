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
      
      
      for(let value of this.data){
        this.productNumbersArray.push(value.productNumber.toString())
      }

      this.options=this.productNumbersArray
      
      
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
      
  }


  ngOnDestroy():void{
    this.MatDialogRef.close(this.dataObtained)
    
  }

  onCloseClick():void{
    this.MatDialogRef.close()
  }


  payDebt(){ 

    if(this.productPay.productNumber == '' || this.productPay.productNumber == null || this.productPay.value == '' 
    || this.productPay.value == null ||  this.productPay.productTo == '' || this.productPay.productTo == null){
      this.snack.open('All fields must be filled','Accept',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }
    
    this.transactionsService.payDebt(Number(this.productPay.productNumber),Number(this.productPay.productTo),Number(this.productPay.value),this.productPay.modifiedBy).subscribe((data)=>{
      
      Swal.fire('Payment complete','Paymen operation was succesful','success');
      window.location.reload();
    },(error =>{
      if(error.status == "404"){
        this.snack.open('Product to pay debt or product from not found','Accept',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        this.snack.open('You have to login','Accept',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }else{
        this.snack.open('The product does not have enough money to pay that debt or you are trying to pay more than the debt','Accept',{
          duration : 3000,
          });
      }
    })
    )
  
  }

}
