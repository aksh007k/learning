import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailValidator } from '@angular/forms';
//import { Employee } from '../model/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8082/employees';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/id/${id}`);
  }

  getByName(name: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/name/${name}`);
  }

  createEmp(employee: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, employee);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}`, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  emailCheckUnique(email: EmailValidator): Observable<any> {
    return this.http.get(`${this.baseUrl}/email/${email}`);
    }
    
}
