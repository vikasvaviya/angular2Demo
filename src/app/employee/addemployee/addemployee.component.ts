import { Component, OnInit } from '@angular/core';
import {EmployeeServiceService} from '../employee-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AdminGuard} from '../../service/admin.guard';
import {GlobalService} from '../../service/global.service';
declare var $: any;

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss']
})
export class AddemployeeComponent implements OnInit {
  IsAddVisible = true;
  focused = false;
  UpdateEmployeeId;
  EmployeeData= {} ;
  empadd: NgForm;
  public href = '';
  constructor(private Employee_ser: EmployeeServiceService,
              private Activeroute: ActivatedRoute,
              private router: Router,
              private adminguard: AdminGuard,
              public msgservice: GlobalService) { }

  ngOnInit() {
      this.UpdateEmployeeId = this.Employee_ser.getEmployeeId();
      if (this.UpdateEmployeeId) {
          this.IsAddVisible = !this.IsAddVisible;
          this.getEmployeeUpdatedata();
      }
  }
  AddEmployee(emp) {
      this.Employee_ser.AddEmployee(emp).subscribe(data => {
          if (data) {
              this.msgservice.ToastMessage(data.msg, 'success');
          }
      });
  }

  UpdateEmployee(updateemployee) {
      updateemployee['id'] = this.UpdateEmployeeId;
      this.Employee_ser.UpdateEmployee(updateemployee ).subscribe(data => {
          this.msgservice.ToastMessage(data.msg, 'success');
          this.router.navigateByUrl('/employee/employeelist');
      });
  }

  getEmployeeUpdatedata() {
      this.Employee_ser.GetUpdateData(this.UpdateEmployeeId).subscribe(data => {
          this.EmployeeData = data;
          if (this.EmployeeData) {
              this.focused = true;
          } else {
              this.EmployeeData = '';
          }
      });
  }
}
