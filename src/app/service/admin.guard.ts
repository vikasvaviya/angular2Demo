import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  public role;
  constructor(protected router: Router, protected authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const jwt = new JwtHelper();
    this.role = jwt.decodeToken(localStorage.getItem('token'));
    if (this.role.employee.Role === 'ADMIN')  {
      return true;
    }
    return false;
  }
}
