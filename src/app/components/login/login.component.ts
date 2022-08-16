import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginUserForm } from 'src/app/forms/user/login-user-form';
import { LoginUserDto } from 'src/app/models/user/login-user.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: LoginUserForm;
  model: LoginUserDto;

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.form = new LoginUserForm();
  }


 /* onLogin(){
    this.authService.SignIn(this.loginForm.get('email').value, this.loginForm.get('password').value);
    console.log(this.loginForm.value);
  }
*/
  login() {
    console.log(this.model)
  }

}
