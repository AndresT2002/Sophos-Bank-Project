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
    this.productDeposit.productNumber=this.dataObtained

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
      Swal.fire('Usuario actualizado','Usuario actualizado con exito en el sistema','success');
      window.location.reload();
    },(error =>{
      console.log(error)
      this.snack.open('Error en la solicitud','Aceptar',{
        duration : 3000,
        
      });
    })
    )
  
  }



}
