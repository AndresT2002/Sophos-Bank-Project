import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DepositComponent } from 'src/app/components/deposit/deposit.component';
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


  data:any;
  currentUser:any;
  products: any
  productsOrdered: any
  activeProducts: any
  inactiveProducts: any
  canceledProducts: any
  constructor(private matDialog:MatDialog,private loginService:LoginService,private productService:ProductsService,private router:Router, private userService: UserService,private snack: MatSnackBar,
    ){}

    ngOnInit():void{

      this.loginService.getCurrentUser().subscribe((dataObtained)=>{
        this.currentUser=dataObtained
        
        this.productService.listClientProducts(this.currentUser.id).subscribe((dataObtained)=>{
          
          this.products=[]
          this.productsOrdered=[]
          this.products.push(dataObtained)
          this.activeProducts=[]
          this.inactiveProducts=[]
          this.canceledProducts=[]
  
          
          this.activeProducts=this.products[0].filter((element:any) => element.status=="Active")
          this.inactiveProducts=this.products[0].filter((element:any) => element.status=="Inactive")
          



          // this.activeProducts=this.sort(this.activeProducts)
          // this.inactiveProducts=this.sort(this.inactiveProducts)
          // this.canceledProducts=this.sort(this.canceledProducts)
  
          
          this.productsOrdered.push(this.sort(this.activeProducts))
          
          this.productsOrdered.push(this.sort(this.inactiveProducts))
          
          
          
          this.productsOrdered=this.productsOrdered.flat()
          this.data=this.productsOrdered
          
        }
        )
        
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



    onOpenDepositDialog(productNumber:any){
      console.log(productNumber)
      let dialogRef=this.matDialog.open(DepositComponent,{
        data:productNumber,
        
        hasBackdrop:true
      })
      
      dialogRef.afterClosed().subscribe(result =>{
        
      })
  
    }

    onOpenWithdrawtDialog(productNumber:any){
      console.log(productNumber)
      let dialogRef=this.matDialog.open(WithdrawComponent,{
        data:productNumber,
        
        hasBackdrop:true
      })
      
      dialogRef.afterClosed().subscribe(result =>{
        
      })
  
    }


    onOpenOverdraftDialog(productNumber:any){
      console.log(productNumber)
      let dialogRef=this.matDialog.open(OverdraftComponent,{
        data:productNumber,
        
        hasBackdrop:true
      })
      
      dialogRef.afterClosed().subscribe(result =>{
        
      })
  
    }

    onOpenTransferDialog(productNumber:any){
      console.log(productNumber)
      let dialogRef=this.matDialog.open(TransferComponent,{
        data:productNumber,
        
        hasBackdrop:true
      })
      
      dialogRef.afterClosed().subscribe(result =>{
        
      })
  
    }

    onOpenPayDebtDialog(productNumber:any){
      console.log(productNumber)
      let dialogRef=this.matDialog.open(PaydebtComponent,{
        data:productNumber,
        
        hasBackdrop:true
      })
      
      dialogRef.afterClosed().subscribe(result =>{
        
      })
  
    }




}
