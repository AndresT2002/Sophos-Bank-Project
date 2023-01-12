import { Component } from '@angular/core';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  constructor(public loginService:LoginService){}

  isLoggedIn = false;
  user:any = null;

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.user = this.loginService.getUser();
    this.loginService.loginStatusSubject.asObservable().subscribe(
      data => {
        this.isLoggedIn = this.loginService.isLoggedIn();
        this.user = this.loginService.getUser();
      }
    )
  }
 
  public logout(){
    this.loginService.logout()
    window.location.reload()
  }

}
