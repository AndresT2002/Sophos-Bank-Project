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
import { Client } from 'src/app/components/interfaces';

interface User {
  id: string,
  identificationNumber:string
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
  data:Array<Client>;
  constructor(private router:Router,private loginService:LoginService,private adminService:AdminServiceService, private MatDialogRef:MatDialogRef<CreateProductComponent>,private snack:MatSnackBar,private productService:ProductsService){}
  
  
  identificatorsArray:Array<User>=[];
   
  myControl = new FormControl('');
  options: User[] =[]
  filteredOptions: Observable<User[]> | undefined;

  

  ngOnInit() {

    this.adminService.listClients().subscribe((dataObtained)=>{
      this.data=dataObtained
      
      
      for(let value of this.data){
        let object: User ={
          id:value.id,
          identificationNumber:value.identificationNumber.toString()
        }
        this.identificatorsArray.push(object)
      }


      this.options=this.identificatorsArray
      
      
    },(error =>{
      if(error.status=="401"){
        
        this.snack.open('You have to login','Accept',{
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
     
  }

  onCloseClick():void{
    this.MatDialogRef.close()
  }
  formSubmit(){
    if(this.product.productType == '' || this.product.productType == null || 
    this.product.createdBy == '' || this.product.createdBy == null ||  
    this.product.gmf == '' || this.product.gmf == null || this.product.belongsTo.id== '' || this.product.belongsTo.id == null){
      this.snack.open('All fields must be filled','Accept',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.productService.createProduct(this.product).subscribe((data)=>{
      
      Swal.fire('Product created','Product created successfully','success');
    },(error =>{
      
      if(error.status == "404"){
        this.snack.open('Client to asociate the product not found','Accept',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        this.snack.open('You have to login','Accept',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }else{
        this.snack.open('You already have a product with GMF exception','Accept',{
          duration : 3000,
          });
      }
    })
    )
  
  }

  }
