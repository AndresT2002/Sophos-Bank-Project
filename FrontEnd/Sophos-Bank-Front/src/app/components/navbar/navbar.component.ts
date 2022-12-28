import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public loginService:LoginService){}

  ngOnInit():void{

  }


  public logout(){
    this.loginService.logout()
    window.location.reload()
  }

}
