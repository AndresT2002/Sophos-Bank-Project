import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA ,MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { ProductsService } from 'src/app/services/products.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { UpdateClientComponent } from '../update-client/update-client.component';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent {
  
  constructor (private loginService:LoginService,private productService:ProductsService,@Inject(MAT_DIALOG_DATA) public dataObtained:any,private router:Router,private snack: MatSnackBar, private MatDialogRef:MatDialogRef<DepositComponent>,private transactionsService: TransactionsService){}

  public productDeposit={
    productNumber:"",
    value:"",
    modifiedBy:this.loginService.getUser().username
  }
  
  
  productNumbers:any;
    
  myControl = new FormControl('');
  options: any[] =[]
  filteredOptions: Observable<any[]> | undefined;
  data:any;
  productNumbersArray:any
  ngOnInit(): void {
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
    this.productDeposit.productNumber=value[0]
    console.log(value)
    
    return
  }
  

  ngOnDestroy():void{
    this.MatDialogRef.close(this.dataObtained)
    
  }

  onCloseClick():void{
    this.MatDialogRef.close()
  }

  deposit(){
    console.log(this.dataObtained)
    if(this.dataObtained !=null){
      this.productDeposit.productNumber=this.dataObtained
    }
    

    if(this.productDeposit.productNumber == '' || this.productDeposit.productNumber == null || this.productDeposit.value == '' 
    || this.productDeposit.value == null  ){
      this.snack.open('Todos los campos deben estar completos','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.transactionsService.deposit(Number(this.productDeposit.productNumber),Number(this.productDeposit.value),this.productDeposit.modifiedBy).subscribe((data)=>{
      console.log(data)
      Swal.fire('Deposit complete','Deposit operation was succesful','success');
      window.location.reload();
    },(error =>{
      console.log(error)
      if(error.status == "404"){
        this.snack.open('Product to deposit not found','Aceptar',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        this.snack.open('Sesion expire, login again','Aceptar',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }else{
        this.snack.open('Error on petition','Aceptar',{
          duration : 3000,
          });
      }
      
    })
    )
  
  }



}
