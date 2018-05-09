import { Component, OnInit } from '@angular/core';
import {EmployeeServiceService} from '../employee-service.service';
import {Http} from '@angular/http';

@Component({
  selector: 'app-editemployeework',
  templateUrl: './editemployeework.component.html',
  styleUrls: ['./editemployeework.component.scss']
})
export class EditemployeeworkComponent implements OnInit {
  EditEmployeeId;
  EditEmployeeData;
  constructor(private Empservice: EmployeeServiceService, private http: Http) { }

  ngOnInit() {
    this.editwork();
  }
  editwork() {
    this.EditEmployeeId = this.Empservice.getEmployeeId();
    this.http.get('http://localhost:3000/geteditemployeedata/' + this.EditEmployeeId)
        .map((response) => response.json()).subscribe(data => {
          this.EditEmployeeData = data;
    });
  }

}
