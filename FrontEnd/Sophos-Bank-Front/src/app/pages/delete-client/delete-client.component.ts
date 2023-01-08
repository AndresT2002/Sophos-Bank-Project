import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, startWith, map } from 'rxjs';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import  { MatDialogRef} from '@angular/material/dialog'
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
  constructor(private userService:UserService, private MatDialogRef:MatDialogRef<DeleteClientComponent>,private adminService:AdminServiceService,private snack:MatSnackBar,private productService:ProductsService){}
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
      
      
    }
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
      Swal.fire('Usuario Eliminado','Usuario eliminado con exito en el sistema','success');
    },(error =>{
      console.log(error)
      this.snack.open('Error en la solicitud','Aceptar',{
        duration : 3000,
        
      });
    })
    )
  }
}
