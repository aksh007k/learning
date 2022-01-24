import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
const routes: Routes = [
  {path: '', redirectTo:'employees', pathMatch:'full'},
  {path: 'employees', component: EmployeeListComponent},
  {path: 'add', component: AddEmployeeComponent},
  {path: 'details/:name', component: EmployeeDetailsComponent},
  {path: 'update/:id', component: UpdateEmployeeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
