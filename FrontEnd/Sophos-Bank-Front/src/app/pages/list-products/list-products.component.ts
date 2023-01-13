import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CurrentUser, Product } from 'src/app/components/interfaces';
import { ProductTransHistoryComponent } from 'src/app/components/product-trans-history/product-trans-history.component';


import { LoginService } from 'src/app/services/login.service';

import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})

export class ListProductsComponent {
  columndefs : string[] = ['productNumber','createdAt','createdBy','modifiedAt','modifiedBy','debtValue','gmf','productBalance','productAvailable','productType','status','activateProduct','desactivateProduct','cancelProduct','activateGmf','desactivateGmf','productHistory'];
  
  constructor(private matDialog:MatDialog,private loginService:LoginService,private productService:ProductsService,private router:Router, private userService: UserService,private snack: MatSnackBar,
    ){}
  
  
  modifiedBy=this.loginService.getUser().username
  currentUser:CurrentUser | undefined;
  activeProducts:Product[] =[] 
  inactiveProducts:Product[] =[] 
  canceledProducts:Product[] =[] 
  products: Array<Product> =[] 
  productsOrdered: Array<Array<Product>> =[] 
  finalProducts:Product[] =[] 
  data: Product[] =[] 



  
  ngOnInit():void{
    
    this.loginService.getCurrentUser().subscribe((dataObtained)=>{
      this.currentUser=dataObtained
      
      this.productService.listClientProducts(this.currentUser.id).subscribe((dataObtained)=>{
        
        
        this.products=dataObtained
        

        
        this.activeProducts=this.products.filter((element:Product) => element.status=="Active")
        this.inactiveProducts=this.products.filter((element:Product) => element.status=="Inactive")
        this.canceledProducts=this.products.filter((element:Product) => element.status=="Canceled")

      
        this.productsOrdered.push(this.sort(this.activeProducts))
        
        this.productsOrdered.push(this.sort(this.inactiveProducts))
        
        this.productsOrdered.push(this.sort(this.canceledProducts))
        
        this.data=this.productsOrdered.flat()
        
      }
      )
      
    },(error =>{
      if(error.status=="401"){
        
        this.snack.open('You have to login','Accept',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }
    }
    )
    )
    
    
  }


  sort(productsArray:Array<Product>){
    
    if(productsArray.length==0){
      
      return []
    }

    for(let i = 0; i < productsArray.length; i++){
    
   
      for(let j = 0; j < ( productsArray.length - i -1 ); j++){
         
      
        if(productsArray[j].productAvailable < productsArray[j+1].productAvailable){
       
          let temp = productsArray[j]
          productsArray[j] = productsArray[j + 1]
          productsArray[j+1] = temp
        }
      }
    }

    return productsArray
  }

  activateProduct(productId: number){
    
    
    this.productService.activateProduct(productId,this.modifiedBy).subscribe((data)=>{
      
      Swal.fire('Product Activated','Producto Activated succesfully','success');
      window.location.reload();
    },(error =>{
      
      if(error.status == "404"){
        this.snack.open('Product to activate not found','Accept',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        
        this.snack.open('You have to login','Accept',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }else if(error.status=="400"){
        this.snack.open('This product is already active','Accept',{
          duration : 3000,
          });
      }else{
        this.snack.open('Error on petition','Accept',{
          duration : 3000,
          });
      }
    })
    )
  }


  activateGmf(productId: number){
    

    this.productService.activateGmf(productId,this.modifiedBy).subscribe((data)=>{
      
      Swal.fire('GMF Activated','GMF Activated succesfully','success');
      window.location.reload();
    },(error =>{
    
      if(error.status == "404"){
        this.snack.open('Product to activate GMF or product from  not found','Accept',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        this.snack.open('You have to login','Accept',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }else{
        this.snack.open('You can only have GMF exception on one product','Accept',{
          duration : 3000,
          });
      }
    })
    )
  }


  desactivateProduct(productId: number){
    

    this.productService.desactivateProduct(productId,this.modifiedBy).subscribe((data)=>{
      
      Swal.fire('Product Desactivated','Product desactivated succesfully','success');
      window.location.reload();
    },(error =>{
     
      if(error.status == "404"){
        this.snack.open('Product to desactivate not found','Accept',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        this.snack.open('You have to login','Accept',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }else{
        this.snack.open('This product is already inactive','Accept',{
          duration : 3000,
          });
      }
    })
    )
  }


  desactivateGmf(productId: number){
    

    this.productService.desactivateGmf(productId,this.modifiedBy).subscribe((data)=>{
      
      Swal.fire('GMF Desactivated','GMF Desactivated succesfully','success');
      window.location.reload();
    },(error =>{
      
      this.snack.open('Error doing the request','Accept',{
        duration : 3000,
        
      });
    })
    )
  }


  cancelProduct(productNumber: number){
    

    this.productService.cancelProduct(productNumber,this.modifiedBy).subscribe((data)=>{
      
      Swal.fire('Product Canceled','Product canceled succesfully','success');
      window.location.reload();
    },(error =>{
      
      if(error.status == "404"){
        this.snack.open('Product to cancel not found','Accept',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        this.snack.open('You have to login','Accept',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }else{
        this.snack.open('Your product balance is higher than $1 or has a debt ','Accept',{
          duration : 3000,
          });
      }
    })
    )
  }

  onOpenProductHistoryDialog(productNumber:number){

    let dialogRef=this.matDialog.open(ProductTransHistoryComponent,{
      data:productNumber,
      height: '90%',
      width: '50%',
      hasBackdrop:true
    })
    
    dialogRef.afterClosed().subscribe(result =>{
      
    })

  }



}
