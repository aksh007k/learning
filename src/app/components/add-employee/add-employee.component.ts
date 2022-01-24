import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  submitted = false;

  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(){
  }
  newEmployee(): void{
    this.submitted=false;
    this.employee= new Employee();
  }

  save(){
    this.employeeService
    .createEmp(this.employee).subscribe(
      data =>{
        console.log(data)
        this.employee=new Employee();
        this.gotoList();
      },
      error => console.log(error));
  }

  onSubmit() {
    this.submitted =true;
    this.save();
  }

  gotoList(){
    this.router.navigate(['/employees']);
  }


}
