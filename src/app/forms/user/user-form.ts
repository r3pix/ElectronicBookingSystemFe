import { IdentityForm } from './../identity/identity-form';
import { AddressForm } from './../address/address-form';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
export class UserForm extends FormGroup{
  constructor(){
    super({
      id: new FormControl(null),
      email: new FormControl(null),
      role: new FormControl(null),
    });

    this.addressForm = new AddressForm();
    this.identityForm = new IdentityForm();
  }
  addressForm: AddressForm;
  identityForm: IdentityForm;
}
