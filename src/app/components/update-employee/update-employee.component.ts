import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  employee: Employee;

  constructor(private route: ActivatedRoute, private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit(){
    this.employee = new Employee();
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployee(this.id).subscribe
    (data => {
      this.employee = data;
      console.log(this.employee)
    }, error => console.log(error));
  }

  updateEmp(){
    this.employeeService.updateEmployee(this.id, this.employee)
    .subscribe(data =>{
      console.log(data);
      this.employee= new Employee();
      this.gotoList();
    },error => console.log(error));
  }

  onSubmit() {
    this.updateEmp();
    console.log(this.employee);    
  }

  gotoList() {
    this.router.navigate(['/../../'],{relativeTo: this.route});
  }


}
