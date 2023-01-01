import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { DeleteClientComponent } from './pages/delete-client/delete-client.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

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
    pathMatch:'full',
    canActivate:[AdminGuard]
  },

  {
    path:'login',
    component:LoginComponent,
    pathMatch:'full'
  },

  {
    path:'admin',
    component:DashboardComponent,
    pathMatch:'full',
    canActivate:[AdminGuard]
  },

  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    pathMatch:'full',
    canActivate:[NormalGuard]
  },

  {
    path:'deleteClient',
    component:DeleteClientComponent,
    pathMatch:'full',
    canActivate:[AdminGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
