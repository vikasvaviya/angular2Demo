import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  CurrentEmployee: any;
  constructor(private http: Http, private router: Router) {
      const token = localStorage.getItem('token');
      if (token) {
          const jwt = new JwtHelper();
          this.CurrentEmployee = jwt.decodeToken(token);
      }
  }

  login(credentials) {
      return this.http.post('http://localhost:3000/Login', credentials)
          .map(response => {
              const result = response.json();
              if (result && result.token) {
                  localStorage.setItem('token', result.token );
                  const jwt = new JwtHelper();
                  this.CurrentEmployee = jwt.decodeToken(localStorage.getItem('token'));
                  return true;
              } else {
                  return [false, result];
              }
          });
  }

  isLoggedIn() {
    return tokenNotExpired('token');
  }

  logout() {
      const e = false;
      this.http.post('http://localhost:3000/Work/' + e , this.CurrentEmployee )
          .map(response => { }).subscribe(data => { });
      localStorage.removeItem('token');
      this.CurrentEmployee = null;
      this.router.navigateByUrl('/login');
  }

}
