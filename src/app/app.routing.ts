import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { LoginComponent } from './login/login/login.component';
import {AuthGuard} from '../app/service/auth.guard';
import {AdminGuard} from './service/admin.guard';
import {ImageUploadComponent} from './image-upload/image-upload.component';

const routes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [ AuthGuard]},
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [ AuthGuard ] },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent, canActivate: [AdminGuard] },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'login', component: LoginComponent},
    { path: '', component: LoginComponent},
    { path: 'upgrade',        component: UpgradeComponent },
    {path: 'Image', component: ImageUploadComponent},
    { path: 'employee', loadChildren: 'app/employee/employee.module#EmployeeModule'},
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
