import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent {
  constructor(private snack:MatSnackBar,private router:Router,private loginService:LoginService){}
  public isLoggedIn:boolean

  ngOnInit(){
    this.isLoggedIn = this.loginService.isLoggedIn();
    if(!this.isLoggedIn){
      this.snack.open('You have to login','Accept',{
        duration : 3000,
        });

        this.loginService.logout()
        this.router.navigate(["/login"]) 
    }
  }

}
