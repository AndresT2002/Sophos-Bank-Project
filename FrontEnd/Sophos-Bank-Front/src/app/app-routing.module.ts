import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [

  {
    path:'',
    component:HomeComponent,
    //Redirijo si no encuentro una ruta con pathMatch full
    pathMatch:'full'
  } ,

  {
    path:'register',
    component:RegisterComponent,
    pathMatch:'full'
  },

  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
