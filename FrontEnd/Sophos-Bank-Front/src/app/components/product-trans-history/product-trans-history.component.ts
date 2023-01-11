import { Component, Inject } from '@angular/core';
import  {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-product-trans-history',
  templateUrl: './product-trans-history.component.html',
  styleUrls: ['./product-trans-history.component.css']
})
export class ProductTransHistoryComponent {

  columndefs : any[] = ['amount','movementType','productNumber','transactionDate','transactionType','productAvailable','productBalance'];

  
  constructor(private transactionService:TransactionsService,private MatDialogRef:MatDialogRef<ProductTransHistoryComponent>,@Inject(MAT_DIALOG_DATA) public productData:any){ }

  
  public product={
    productNumber:this.productData.productNumber,
    

    }
  
  transactionData:any;



  ngOnDestroy():void{
    this.MatDialogRef.close(this.productData)
    
  }

  onCloseClick():void{
    this.MatDialogRef.close()
  }



  ngOnInit():void{
    this.transactionService.productTransactionHistory(this.product.productNumber).subscribe((dataObtained)=>{
      this.transactionData=dataObtained;
      
    })
  }




}
