import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddemployeeComponent} from '../employee/addemployee/addemployee.component';
import {EmployeelistComponent} from '../employee/employeelist/employeelist.component';
import {AuthGuard} from '../service/auth.guard';
import {EditemployeeworkComponent} from './editemployeework/editemployeework.component';


const appRoutes: Routes = [
    { path: 'employeeadd', component: AddemployeeComponent, canActivate: [AuthGuard] },
    { path: 'employeelist', component: EmployeelistComponent, canActivate: [AuthGuard] },
    { path: 'employeeupdate', component: AddemployeeComponent, canActivate: [AuthGuard] },
    {path: 'employeeworkedit', component: EditemployeeworkComponent},
]
@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }
