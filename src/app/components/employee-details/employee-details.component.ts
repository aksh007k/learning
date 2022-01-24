import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  name: '';
  id: number;
  employee: Employee;

  constructor(private route: ActivatedRoute,private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employee = new Employee();

    this.name = this.route.snapshot.params['name'];
    
    this.employeeService.getByName(this.name)
      .subscribe(data => {
        console.log(data)
        this.employee = data;
      }, error => console.log(error));
  }

  list(){
    this.router.navigate(['employees']);
  }

  deleteEmployee(id: number) {
    // if(confirm("Are you sure to delete?")){
    //   var myForm = new myForm();

    //   myForm.append('deleid', id);
    //   this.employeeService.deleteEmployee(myForm);
    //   alert({
    //     title: 'Delete Info',
    //     text: 'Employee deleted Successfully',
    //     icon: 'success'
    //   });

    // }
    this.employeeService.deleteEmployee(id)
      .subscribe(
        data => {
          console.log(data);
          this.list();
        },
        error => console.log(error));
  }

  empUpdate(id: number){
    this.router.navigate(['update', id]);
  }

}
