import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';


@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    EmployeeListComponent,
    UpdateEmployeeComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
