import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { FormGroup, FormControl, ValidatorFn, AbstractControl, FormBuilder, EmailValidator } from '@angular/forms';
import { Validators } from '@angular/forms';
import { error, Key } from 'protractor';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  userValid: FormGroup;
  // userValid = new FormGroup({
  //   vName: new FormControl('',[Validators.required, this.NameExists()]),
  //   pEmail: new FormControl('',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  //   vPhone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
  //   vDept: new FormControl('',[Validators.required]),
  //   vDesg: new FormControl('',[Validators.required])
  // });

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

  // private NameExists(): ValidatorFn{
  //   return (control: AbstractControl): {[Key: string]: any} =>{
  //     this.employeeService.getByName(control).subscribe
  //     (
  //       ({data}) => {
  //         let res: string =data;
  //         if(res === control.value){
  //           return {'alreadyExist': true};
  //         } else {
  //           return null
  //         }
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     )
  //   }
  // }

  emailExistsValidator(control: FormControl){
    let email = control.value;
    this.employeeService.emailCheckUnique(email).subscribe(
      (data) => {
        if(data.email === email){
          console.log(data.email)
        return {
          duplicateEmailId: {
            email: email
          }
        }
      }
      return null;
      }
    )
    // validated = {
    //   duplicateEmailId: email
    // }
  }

  employee: Employee = new Employee();
  submitted = false;


  constructor(private employeeService: EmployeeService,
    private router: Router, private fb: FormBuilder) { }

  ngOnInit(){
    this.valueCheck();
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
    if(!this.userValid.valid){
      alert('please provide all details');
    }
    else{
      this.submitted =true;
      this.save();
    }
    
  }

  gotoList(){
    this.router.navigate(['/employees']);
  }


}
