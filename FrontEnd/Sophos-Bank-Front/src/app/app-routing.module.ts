import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferComponent } from './components/transfer/transfer.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { DeleteClientComponent } from './pages/delete-client/delete-client.component';
import { HomeComponent } from './pages/home/home.component';
import { ListClientsComponent } from './pages/list-clients/list-clients.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
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
    path:'listClients',
    component:ListClientsComponent,
    pathMatch:'full',
    canActivate:[AdminGuard]
  },
  {
    path:'listClientProducts',
    component:ListProductsComponent,
    pathMatch:'full',
    
  }
  ,
  {
    path:'transactions',
    component:TransactionsComponent,
    pathMatch:'full',
    
    
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
