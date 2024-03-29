import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { DeleteClientComponent } from './pages/delete-client/delete-client.component';
import { ListClientsComponent } from './pages/list-clients/list-clients.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateClientComponent } from './components/update-client/update-client.component';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule} from '@angular/material-moment-adapter';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ListProductsAdminComponent } from './components/list-products-admin/list-products-admin.component';
import { ProductTransHistoryComponent } from './components/product-trans-history/product-trans-history.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { WithdrawComponent } from './components/withdraw/withdraw.component';
import { OverdraftComponent } from './components/overdraft/overdraft.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { PaydebtComponent } from './components/paydebt/paydebt.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MyPageComponent } from './pages/my-page/my-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    DeleteClientComponent,
    ListClientsComponent,
    UpdateClientComponent,
    ListProductsComponent,
    CreateProductComponent,
    ListProductsAdminComponent,
    ProductTransHistoryComponent,
    TransactionsComponent,
    DepositComponent,
    WithdrawComponent,
    OverdraftComponent,
    TransferComponent,
    PaydebtComponent,
    MyPageComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    
    
    
  ],
  providers: [MatDatepickerModule,MatNativeDateModule,authInterceptorProviders, { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
