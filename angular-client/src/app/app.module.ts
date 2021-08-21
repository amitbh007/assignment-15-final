import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { TableRowComponent } from './table/table-row/table-row.component';
import { DataService } from './services/data.service';
import { SanitizeHtmlPipe } from './sanitising.pipe';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CustomerUsersComponent } from './customer-users/customer-users.component';
import { UsersFormComponent } from './users-form/users-form.component';
import { FormsModule } from '@angular/forms';
import { CustomersFormComponent } from './customers-form/customers-form.component';
import { LoginComponent } from './login/login.component';
import { CookieModule } from 'ngx-cookie';
import { RegisteComponent } from './registe/registe.component';

const appRoutes:Routes = [
  {path:"users",component:UsersComponent},
  {path:"customers",component:CustomersComponent},
  {path:"createcustomer",component:CustomersFormComponent},
  {path:"customers/:id/users",component:CustomerUsersComponent},
  {path:"customers/:id/createuser",component:UsersFormComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisteComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableRowComponent,
    SanitizeHtmlPipe,
    UsersComponent,
    CustomersComponent,
    CustomersFormComponent,
    CustomerUsersComponent,
    UsersFormComponent,
    LoginComponent,
    RegisteComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    CookieModule.forRoot(),
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
