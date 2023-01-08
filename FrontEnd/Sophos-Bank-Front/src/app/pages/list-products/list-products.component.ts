import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductTransHistoryComponent } from 'src/app/components/product-trans-history/product-trans-history.component';

import { AdminServiceService } from 'src/app/services/admin-service.service';
import { LoginService } from 'src/app/services/login.service';

import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
//Yes es que si está excenta
export class ListProductsComponent {
  columndefs : any[] = ['productNumber','createdAt','modifiedAt','debtValue','gmf','productAvailable','productBalance','productType','status','activateProduct','desactivateProduct','cancelProduct','activateGmf','desactivateGmf','productHistory'];
  data:any;
  constructor(private matDialog:MatDialog,private loginService:LoginService,private productService:ProductsService,private router:Router, private userService: UserService,private snack: MatSnackBar,
    ){}
  
  currentUser:any;
  activeProducts:any;
  inactiveProducts:any;
  canceledProducts:any;
  products:any;
  productsOrdered:any;

  
  
  ngOnInit():void{

    this.loginService.getCurrentUser().subscribe((dataObtained)=>{
      this.currentUser=dataObtained
      
      this.productService.listClientProducts(this.currentUser.id).subscribe((dataObtained)=>{
        console.log(dataObtained)
        this.products=[]
        this.productsOrdered=[]
        this.products.push(dataObtained)
        this.activeProducts=[]
        this.inactiveProducts=[]
        this.canceledProducts=[]

        
        this.activeProducts=this.products[0].filter((element:any) => element.status=="Active")
        this.inactiveProducts=this.products[0].filter((element:any) => element.status=="Inactive")
        this.canceledProducts=this.products[0].filter((element:any) => element.status=="Canceled")



        // this.activeProducts=this.sort(this.activeProducts)
        // this.inactiveProducts=this.sort(this.inactiveProducts)
        // this.canceledProducts=this.sort(this.canceledProducts)

        
        this.productsOrdered.push(this.sort(this.activeProducts))
        
        this.productsOrdered.push(this.sort(this.inactiveProducts))
        
        this.productsOrdered.push(this.sort(this.canceledProducts))
        
        this.productsOrdered=this.productsOrdered.flat()
        this.data=this.productsOrdered
        
      }
      )
      
    }
    )

    
    
  }


  sort(toOrder:Array<any>){
    
    if(toOrder.length==0){
      
      return []
    }

    for(var i = 0; i < toOrder.length; i++){
    
      // Last i elements are already in place 
      for(var j = 0; j < ( toOrder.length - i -1 ); j++){
         
        // Checking if the item at present iteration
        // is greater than the next iteration
        if(toOrder[j].productAvailable < toOrder[j+1].productAvailable){
            
          // If the condition is true then swap them
          var temp = toOrder[j]
          toOrder[j] = toOrder[j + 1]
          toOrder[j+1] = temp
        }
      }
    }

    return toOrder
  }

  activateProduct(productId: String){
    
    console.log(productId)
    this.productService.activateProduct(Number(productId)).subscribe((data)=>{
      console.log(data)
      Swal.fire('Producto Activado','Producto Activado con exito','success');
      window.location.reload();
    },(error =>{
      console.log(error)
      this.snack.open('Error en la solicitud','Aceptar',{
        duration : 3000,
        
      });
    })
    )
  }


  activateGmf(productId: String){
    

    this.productService.activateGmf(Number(productId)).subscribe((data)=>{
      console.log(data)
      Swal.fire('GMF Activado','GMF Activado con exito','success');
      window.location.reload();
    },(error =>{
      console.log(error)
      this.snack.open('Error en la solicitud','Aceptar',{
        duration : 3000,
        
      });
    })
    )
  }


  desactivateProduct(productId: String){
    

    this.productService.desactivateProduct(Number(productId)).subscribe((data)=>{
      
      Swal.fire('Producto Desactivado','Producto Desactivado con exito','success');
      window.location.reload();
    },(error =>{
      console.log(error)
      this.snack.open('Error en la solicitud','Aceptar',{
        duration : 3000,
        
      });
    })
    )
  }


  desactivateGmf(productId: String){
    

    this.productService.desactivateGmf(Number(productId)).subscribe((data)=>{
      
      Swal.fire('GMF Desactivado','GMF Desactivado con exito','success');
      window.location.reload();
    },(error =>{
      console.log(error)
      this.snack.open('Error en la solicitud','Aceptar',{
        duration : 3000,
        
      });
    })
    )
  }


  cancelProduct(productNumber: String){
    

    this.productService.cancelProduct(Number(productNumber)).subscribe((data)=>{
      
      Swal.fire('Producto Cancelado','Producto Cancelado con exito','success');
      window.location.reload();
    },(error =>{
      console.log(error)
      this.snack.open('Error en la solicitud','Aceptar',{
        duration : 3000,
        
      });
    })
    )
  }

  onOpenProductHistoryDialog(productNumber:any){

    let dialogRef=this.matDialog.open(ProductTransHistoryComponent,{
      data:productNumber,
      
      hasBackdrop:true
    })
    
    dialogRef.afterClosed().subscribe(result =>{
      
    })

  }



}
