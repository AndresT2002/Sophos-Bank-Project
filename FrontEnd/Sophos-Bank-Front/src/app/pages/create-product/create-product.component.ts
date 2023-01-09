import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import  { MatDialogRef} from '@angular/material/dialog'
import { LoginService } from 'src/app/services/login.service';
import {  Router } from '@angular/router';

export interface User {
  id: number;
  identificationNumber:number
}
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit{
  public product={
    productType:"",
    gmf:"",
    createdBy:"ADMIN",
    belongsTo:{
      id:null
    }
  }
  data:any;
  constructor(private router:Router,private loginService:LoginService,private adminService:AdminServiceService, private MatDialogRef:MatDialogRef<CreateProductComponent>,private snack:MatSnackBar,private productService:ProductsService){}
  identificatorsArray:any;
  ids:any;
  
  
  myControl = new FormControl('');
  options: any[] =[]
  filteredOptions: Observable<any[]> | undefined;

  

  ngOnInit() {

    this.adminService.listClients().subscribe((dataObtained)=>{
      this.data=dataObtained
      
      this.identificatorsArray=[]
      for (let index = 0; index < this.data.length; index++) {
        const element = this.data[index];
        let object={
          id:element.id,
          identificationNumber:element.identificationNumber.toString()
        }
        this.identificatorsArray.push(object)
      }
      
      this.options=this.identificatorsArray
      
      
    },(error =>{
      if(error.status=="401"){
        
        this.snack.open('You have to login','Aceptar',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }
    })
    )

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
            map(term => this._filter(term || '')),
    );


   

  } 

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.identificationNumber.includes(filterValue));;
  }

  updateMySelection(identificationNumber:string){
    let value=this._filter(identificationNumber)
    this.product.belongsTo.id=value[0].id
    console.log(value)
    
    return
  }

  onCloseClick():void{
    this.MatDialogRef.close()
  }
  formSubmit(){
    
    console.log(this.product)
    if(this.product.productType == '' || this.product.productType == null || 
    this.product.createdBy == '' || this.product.createdBy == null ||  
    this.product.gmf == '' || this.product.gmf == null || this.product.belongsTo.id== '' || this.product.belongsTo.id == null){
      this.snack.open('Todos los campos deben estar completos','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.productService.createProduct(this.product).subscribe((data)=>{
      
      Swal.fire('Producto Creado','Producto creado con exito en el sistema','success');
    },(error =>{
      console.log(error)
      this.snack.open('Error en la solicitud','Aceptar',{
        duration : 3000,
        
      });
    })
    )
  
  }

  }
