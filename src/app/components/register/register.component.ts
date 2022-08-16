import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AddUserForm } from 'src/app/forms/user/add-user.form';


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

  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    this.form = new AddUserForm();
  }

 /* onRegister(){
    this.authService.SignUp(this.registerForm.get('email').value, this.registerForm.get('password').value, this.registerForm.get('name').value, false);
  }
*/

  register() {
    console.log(this.form.value)
  }

}
