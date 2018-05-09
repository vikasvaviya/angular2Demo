import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {AdminGuard} from '../../service/admin.guard';
import {GlobalService} from '../../service/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;

  constructor(private router: Router,
              public authService: AuthService,
              public adminguard: AdminGuard,
              public msgservice: GlobalService ) { }

  ngOnInit() {
  }

  Login(credentials) {
      this.authService.login(credentials)
          .subscribe(result => {
              if (result === true) {
                  this.router.navigate(['/dashboard']);
              } else {
                  this.msgservice.ToastMessage(result[1].msg, 'danger')
                  this.invalidLogin = true;
              }
          });
  }
}
