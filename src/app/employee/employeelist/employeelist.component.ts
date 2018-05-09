import {Component, Input, OnInit} from '@angular/core';
import {EmployeeServiceService} from '../employee-service.service';
import {Router} from '@angular/router';
import {GlobalService} from '../../service/global.service';
import {AdminGuard} from '../../service/admin.guard';
import {JwtHelper} from 'angular2-jwt';
import * as _ from 'lodash';
import {PagerService} from '../../service/pager.service';
declare var $: any;

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss']
})
export class EmployeelistComponent implements OnInit {
  EmployeeData = [];
  SearchEmployeeData = [];
  pager: any = {};
  pageditems: any = [];
currentStringDate = new Date().toISOString().substring(0, 10);
  /*
    EmployeeWork;
  */
  jwt = new JwtHelper();
  CurrentEmployee = this.jwt.decodeToken(localStorage.getItem('token'));
  constructor(private Emp_service: EmployeeServiceService,
              private router: Router,
              public msgservice: GlobalService,
              public adminservice: AdminGuard,
              public pagerservice : PagerService) { }

  ngOnInit() {
    this.GetEmployee();
  }

  GetEmployee() {
    if (this.adminservice.canActivate(null, null) === true) {
      this.Emp_service.GetAllEmployeeWork().subscribe(EmployeeData => {
        this.EmployeeData = EmployeeData;
        this.SearchEmployeeData = EmployeeData;
        this.setPage(1);
      });
    } else {
      this.Emp_service.GetCurrent(this.CurrentEmployee.employee._id).subscribe(CurrentEmployeeData => {
        this.EmployeeData = CurrentEmployeeData;
      });
    }
  }

  setPage(page: number) {
    if(page < 0 || page > this.pager.totalPages) {
      return;
    }

    this.pager = this.pagerservice.getPager(this.EmployeeData.length, page);
    this.pageditems = this.EmployeeData.slice(this.pager.startindex, this.pager.endindex + 1)
  }

  DeleteEmployee(id) {
    this.Emp_service.DeleteEmployee(id).subscribe(data => {this.GetEmployee();
    this.msgservice.ToastMessage(data.msg, 'danger');
    });
  }

  EditEmployee(id) {
    this.Emp_service.setEmployeeId(id);
    this.router.navigateByUrl('/employee/employeeupdate');
  }
  datefilter(startDate , ToDate) {
    if (startDate && ToDate) {
      const selectedMembers = this.SearchEmployeeData.filter(m => m._id.Date >= startDate && m._id.Date <= ToDate);
      console.log(selectedMembers);
      this.EmployeeData = selectedMembers;
    }
  }


  /*
    Work(id) {
      this.Emp_service.GetEmployeeWork(id).subscribe(data => {
        this.EmployeeWork = data;
      });
    }*/
}
