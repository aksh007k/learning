import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormGroup, FormControl, ValidatorFn, AbstractControl, FormBuilder, EmailValidator } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})



export class UpdateEmployeeComponent implements OnInit {

  id: number;
  employee: Employee;
  userValid: FormGroup;

  get pemail(){
    return this.userValid.get('pEmail')
  }
  get vname(){
    return this.userValid.get('vName')
  }
  get vphone(){
    return this.userValid.get('vPhone')
  }

  get vdept(){
    return this.userValid.get('vDept')
  }

  get vdesg(){
    return this.userValid.get('vDesg')
  }


  constructor(private route: ActivatedRoute, private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit(){
    this.valueCheck();
    this.employee = new Employee();
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployee(this.id).subscribe
    (data => {
      this.employee = data;
      console.log(this.employee)
    }, error => console.log(error));
  }

  emailExistsValidator(control: FormControl){
    let email = control.value;
    let validated = null;
    // this.employeeService.emailCheckUnique(email).subscribe(
    //   (data) => {
    //     return validated = {
    //       duplicateEmailId: email
    //     }
    //   }
    // )
    validated = {
      duplicateEmailId: email
    }
    return validated;
  }


  valueCheck(){
    this.userValid = new FormGroup({
      vName: new FormControl('',[Validators.required]),
      pEmail: new FormControl('',[Validators.required, 
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), 
        this.emailExistsValidator.bind(this)]),
      vPhone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      vDept: new FormControl('',[Validators.required]),
      vDesg: new FormControl('',[Validators.required])
    });
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
