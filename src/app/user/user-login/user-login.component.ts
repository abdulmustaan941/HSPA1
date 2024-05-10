import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../../service/alertify.service';
import { AuthService } from '../../service/auth.service';
import { UserForLogin } from 'app/model/user';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {

constructor(private authService: AuthService,
  private alertify: AlertifyService,
  private router: Router) { }

ngOnInit() {
}

//onLogin(loginForm: NgForm) {
//console.log(loginForm.value);
//const token = this.authService.authUser(loginForm.value);
//if (token) {
//localStorage.setItem('token', token.userName);
//this.alertify.success('Login Successful');
//this.router.navigate(['/']);
//} else {
//this.alertify.error('User id or password is wrong');
//}
//}

// 
}