import { UserService } from 'src/app/services/user.service';
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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.form = new LoginUserForm();
  }


  onLogin(){
    this.userService.logIn(new LoginUserDto(this.form.value));
  }

  login() {
    console.log(this.model)
  }

}
