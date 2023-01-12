import { Component, Inject } from '@angular/core';
import  {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Product, TransactionHistory } from '../interfaces';

@Component({
  selector: 'app-product-trans-history',
  templateUrl: './product-trans-history.component.html',
  styleUrls: ['./product-trans-history.component.css']
})
export class ProductTransHistoryComponent {

  columndefs : string[] = ['amount','movementType','productNumber','transactionDate','transactionType','productAvailable','productBalance'];

  
  constructor(private transactionService:TransactionsService,private MatDialogRef:MatDialogRef<ProductTransHistoryComponent>,@Inject(MAT_DIALOG_DATA) public productData:Product){ }

  
  public product={
    productNumber:this.productData.productNumber,
    }
  
  transactionData:Array<TransactionHistory> 
  


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
