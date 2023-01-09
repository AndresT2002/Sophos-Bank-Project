import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, startWith, map } from 'rxjs';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import  { MatDialogRef} from '@angular/material/dialog'
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.css']
})
export class DeleteClientComponent {

  public identificationNumber={
    number:''
  }

  
  data:any;
  constructor(private router:Router,private loginService:LoginService,private userService:UserService, private MatDialogRef:MatDialogRef<DeleteClientComponent>,private adminService:AdminServiceService,private snack:MatSnackBar,private productService:ProductsService){}
  identificatorsArray:any;
  ids:any;
  
  
  myControl = new FormControl('');
  options: any[] =[]
  filteredOptions: Observable<any[]> | undefined;

  ngOnInit(): void {

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
    this.identificationNumber.number=value[0].identificationNumber
    console.log(value)
    
    return
  }
  onCloseClick():void{
    this.MatDialogRef.close()
  }
  deleteClient(){
    console.log(this.identificationNumber)
    if(this.identificationNumber.number == '' || this.identificationNumber.number == null ){
      this.snack.open('El campo no puede estar vacío','Aceptar',{
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    this.userService.deleteClient(Number(this.identificationNumber.number)).subscribe((data)=>{
      console.log(data)
      Swal.fire('Client eliminated','Cient eliminated successfully','success');
    },(error =>{
      console.log(error)
      if(error.status == "404"){
        this.snack.open('Client not found','Aceptar',{
          duration : 3000,
          });
      }else if(error.status=="401"){
        this.snack.open('You have to login','Aceptar',{
          duration : 3000,
          });

          this.loginService.logout()
          this.router.navigate(["/login"]) 
      }else{
        this.snack.open('Client has at least one product without being cancelled','Aceptar',{
          duration : 3000,
          });
      }
    })
    )
  }
}
