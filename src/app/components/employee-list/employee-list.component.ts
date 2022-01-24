import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employees: Employee[];
  name = '';
  
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.retriveData();
  }

  retriveData(){
     this.employeeService.getAll().subscribe(
      res => {
        this.employees=res;
        console.log(this.employees);        

      }
    )
    
  }

  searchName(): void{
    this.employeeService.getByName(this.name).subscribe
    (data => {
      this.employees=data;
      console.log(data);
      this.gotoList(data.empName);
    },
    error => {
      console.log(error);
    });
  }

  gotoList(name: string){
    this.router.navigate(['details', name]);
  }



  // retriveEmp(): void{
  //   this.employeeService.getAll()
  //   .subscribe(
  //     data => {
  //       this.employees=data;
  //       console.log(data);
  //       this.displaylist(this.employees);
  //     },
  //     error=>{
  //       console.log(error);
  //     });
  // }

  // displaylist(employees: Employee[]): void{
  //   employees.map(employees => {
  //     this.name=employees.name;
  //     this.email=employees.email;
  //     this.phone=employees.phone;
  //     this.deptId=employees.deptId;
  //     this.desgId=employees.desgId;
  //   })
  // }

}
