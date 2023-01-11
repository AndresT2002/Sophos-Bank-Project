import { Component,Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


import { LoginService } from 'src/app/services/login.service';
import  {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from '@angular/material/dialog'
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { ProductTransHistoryComponent } from '../product-trans-history/product-trans-history.component';


@Component({
  selector: 'app-list-products-admin',
  templateUrl: './list-products-admin.component.html',
  styleUrls: ['./list-products-admin.component.css']
})
//Yes es que si está excenta
export class ListProductsAdminComponent {
  columndefs : any[] = ['productNumber','createdAt','modifiedAt','modifiedBy','debtValue','gmf','productBalance','productAvailable','productType','status','activateProduct','desactivateProduct','cancelProduct','activateGmf','desactivateGmf','productHistory'];
  data:any;
  constructor(private matDialog:MatDialog,private MatDialogRef:MatDialogRef<ListProductsAdminComponent>,@Inject(MAT_DIALOG_DATA) public clientData:any,private loginService:LoginService,private productService:ProductsService,private router:Router, private userService: UserService,private snack: MatSnackBar,
    ){}

  currentUser:any;
  activeProducts:any;
  inactiveProducts:any;
  canceledProducts:any;
  products:any;
  productsOrdered:any;
  modifiedBy=this.loginService.getUser().username


  public client={
    id:this.clientData.id,
    }
  
  ngOnDestroy():void{
    this.MatDialogRef.close(this.clientData)
    
  }

  onCloseClick():void{
    this.MatDialogRef.close()
  }



  ngOnInit():void{
    
    this.loginService.getCurrentUser().subscribe((dataObtained)=>{
      this.currentUser=dataObtained
      
      this.productService.listClientProducts(this.client.id).subscribe((dataObtained)=>{
        
        this.products=[]
        this.productsOrdered=[]
        this.products.push(dataObtained)
        this.activeProducts=[]
        this.inactiveProducts=[]
        this.canceledProducts=[]

        
        this.activeProducts=this.products[0].filter((element:any) => element.status=="Active")
        this.inactiveProducts=this.products[0].filter((element:any) => element.status=="Inactive")
        this.canceledProducts=this.products[0].filter((element:any) => element.status=="Canceled")

        

        
        this.productsOrdered.push(this.sort(this.activeProducts))
        
        this.productsOrdered.push(this.sort(this.inactiveProducts))
        
        this.productsOrdered.push(this.sort(this.canceledProducts))
        
        this.productsOrdered=this.productsOrdered.flat()
        this.data=this.productsOrdered
        
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
    })
    )

    
    
  }


  sort(toOrder:Array<any>){
    
    if(toOrder.length==0){
      
      return []
    }

    for(let i = 0; i < toOrder.length; i++){
    
      // Last i elements are already in place 
      for(let j = 0; j < ( toOrder.length - i -1 ); j++){
         
        // Checking if the item at present iteration
        // is greater than the next iteration
        if(toOrder[j].productAvailable < toOrder[j+1].productAvailable){
            
          // If the condition is true then swap them
          let temp = toOrder[j]
          toOrder[j] = toOrder[j + 1]
          toOrder[j+1] = temp
        }
      }
    }

    return toOrder
  }

  activateProduct(productId: string){
    
    this.productService.activateProduct(Number(productId),this.modifiedBy).subscribe((data)=>{
      
      Swal.fire('Product Activated','Product Activated successfully','success');
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
      }else{
        this.snack.open('This product is already active','Accept',{
          duration : 3000,
          });
      }
    })
    )
  }


  activateGmf(productId: string){
    

    this.productService.activateGmf(Number(productId),this.modifiedBy).subscribe((data)=>{
      console.log(data)
      Swal.fire('GMF Activated','GMF Activated successfully','success');
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


  desactivateProduct(productId: string){
    

    this.productService.desactivateProduct(Number(productId),this.modifiedBy).subscribe((data)=>{
      
      Swal.fire('Product Desactivated','Product Desactivated successfully','success');
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


  desactivateGmf(productId: string){
    

    this.productService.desactivateGmf(Number(productId),this.modifiedBy).subscribe((data)=>{
      
      Swal.fire('GMF Desactivated','GMF Desactivated successfully','success');
      window.location.reload();
    },(error =>{
     
      if(error.status == "404"){
        this.snack.open('Product to desactivate GMF exception not found','Accept',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        this.snack.open('You have to login','Accept',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }
    })
    )
  }


  cancelProduct(productNumber: string){
    

    this.productService.cancelProduct(Number(productNumber),this.modifiedBy).subscribe((data)=>{
      
      Swal.fire('Product Canceled','Product Canceled successfully','success');
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

  onOpenProductHistoryDialog(productNumber:any){

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
