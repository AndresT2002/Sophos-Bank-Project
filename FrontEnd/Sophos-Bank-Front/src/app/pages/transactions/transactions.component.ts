import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DepositComponent } from 'src/app/components/deposit/deposit.component';
import { CurrentUser, Product } from 'src/app/components/interfaces';
import { OverdraftComponent } from 'src/app/components/overdraft/overdraft.component';
import { PaydebtComponent } from 'src/app/components/paydebt/paydebt.component';
import { TransferComponent } from 'src/app/components/transfer/transfer.component';
import { WithdrawComponent } from 'src/app/components/withdraw/withdraw.component';
import { LoginService } from 'src/app/services/login.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {


  data:Array<Product> =[] ;
  currentUser:CurrentUser;
  products: Array<Product> =[]
  productsOrdered: Array<Array<Product>> =[] 
  activeProducts: Product[] =[] 
  inactiveProducts: Product[] =[] 
  canceledProducts: Product[] =[] 


 



  constructor(private matDialog:MatDialog,private loginService:LoginService,private productService:ProductsService,private router:Router, private userService: UserService,private snack: MatSnackBar,
    ){}

    ngOnInit():void{

      this.loginService.getCurrentUser().subscribe((dataObtained)=>{
        this.currentUser=dataObtained
        
        this.productService.listClientProducts(this.currentUser.id).subscribe((dataObtained)=>{
          
          
          this.products=dataObtained     
  
          this.activeProducts=this.products.filter((element:any) => element.status=="Active")
          this.inactiveProducts=this.products.filter((element:any) => element.status=="Inactive")
                    
          this.productsOrdered.push(this.sort(this.activeProducts))
          
          this.productsOrdered.push(this.sort(this.inactiveProducts))
          
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
      })
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



    onOpenDepositDialog(productNumber:number){

      let dialogRef=this.matDialog.open(DepositComponent,{
        data:productNumber,
        height: '50%',
        width: '40%',
        hasBackdrop:true
      })
      
      dialogRef.afterClosed().subscribe(result =>{
        
      })
  
    }

    onOpenWithdrawtDialog(productNumber:number){
      console.log(productNumber)
      let dialogRef=this.matDialog.open(WithdrawComponent,{
        data:productNumber,
        height: '50%',
        width: '40%',
        hasBackdrop:true
      })
      
      dialogRef.afterClosed().subscribe(result =>{
        
      })
  
    }


    onOpenOverdraftDialog(productNumber:number){
      console.log(productNumber)
      let dialogRef=this.matDialog.open(OverdraftComponent,{
        data:productNumber,
        height: '50%',
        width: '40%',
        hasBackdrop:true
      })
      
      dialogRef.afterClosed().subscribe(result =>{
        
      })
  
    }

    onOpenTransferDialog(productNumber:number){
      console.log(productNumber)
      let dialogRef=this.matDialog.open(TransferComponent,{
        data:productNumber,
        height: '60%',
        width: '40%',
        hasBackdrop:true
      })
      
      dialogRef.afterClosed().subscribe(result =>{
        
      })
  
    }

    onOpenPayDebtDialog(productNumber:number){
      
      let dialogRef=this.matDialog.open(PaydebtComponent,{
        data:productNumber,
        height: '60%',
        width: '40%',
        hasBackdrop:true
      })
      
      dialogRef.afterClosed().subscribe(result =>{
        
      })
  
    }




}
