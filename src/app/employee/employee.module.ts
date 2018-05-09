import {NgModule} from '@angular/core';
import {EmployeeRoutingModule} from './employee-routing.module';
import {AddemployeeComponent} from './addemployee/addemployee.component';
import {CommonModule} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {EmployeeServiceService} from './employee-service.service';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EditemployeeworkComponent } from './editemployeework/editemployeework.component';
import {FilterPipe} from './filter.pipe';
@NgModule({
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        AddemployeeComponent,
        EmployeelistComponent,
        EditemployeeworkComponent,
        FilterPipe
    ],
    providers: [EmployeeServiceService]
})

export class EmployeeModule { }
