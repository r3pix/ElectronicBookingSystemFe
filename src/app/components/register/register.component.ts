import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AddUserForm } from 'src/app/forms/user/add-user.form';
import { AddUserDto } from 'src/app/models/user/add-user.dto';


/**
 *
 * @param form
 */

function passwordsMatchValidator(form) {
  const password = form.get('password')
  const confirmPassword = form.get('confirmPassword')

  if(password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordsMatch: true })
  } else {
    confirmPassword.setErrors(null)
  }

  return null
}

/**
 * If the data is valid return null else return an object
 */
function symbolValidator(control) { //control = registerForm.get('password')
  if(control.hasError('required')) return null;
  if(control.hasError('minlength')) return null;

  if(control.value.indexOf('@') > -1) {
    return null
  } else {
    return { symbol: true }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: AddUserForm;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.form = new AddUserForm();
  }

  onRegister(){
    this.userService.register(new AddUserDto(this.form.value));
  }


  register() {
    console.log(this.form.value)
  }

}
