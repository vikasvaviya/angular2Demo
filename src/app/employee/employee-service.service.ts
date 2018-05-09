import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

@Injectable()
export class EmployeeServiceService {
  id;
  constructor(private http: Http, private router: Router) { }
  AddEmployee(Emp) {
    return this.http.post('http://localhost:3000/NewEmployee', Emp)
        .map((response) => response.json());
  }

  /*GetAllEmployee() {
    return this.http.get('http://localhost:3000/GetEmployee')
        .map((response) => response.json());
  }*/

  GetAllEmployeeWork() {
    return this.http.get('http://localhost:3000/GetEmployeeWork')
        .map((response) => response.json());
  }

    GetCurrent(id) {
    return this.http.get('http://localhost:3000/CurrentEmployee/' + id)
        .map((response) => response.json());
  }

  DeleteEmployee(id) {
    return this.http.delete('http://localhost:3000/DeleteEmployee/' + id)
        .map((response) => response.json());
  }

  setEmployeeId(id) {
     this.id = id;
  }

  getEmployeeId() {
    return this.id;
  }


  GetUpdateData(UpdateEmployeeId) {
    return this.http.get('http://localhost:3000/GetUpdateData/' + UpdateEmployeeId)
        .map((response) => response.json());
  }

  UpdateEmployee(updateemployee) {
    return this.http.post('http://localhost:3000/EditEmployee/' + updateemployee.id, updateemployee)
        .map((response) => response.json());
  }


}
