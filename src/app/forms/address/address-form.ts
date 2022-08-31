import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
export class AddressForm extends FormGroup{
  constructor(){
    super({
      id: new FormControl(null),
      city: new FormControl(null,[Validators.required]),
      street: new FormControl(null, [Validators.required]),
      number: new FormControl(null, [Validators.required]),
      postalCode: new FormControl(null,[Validators.required])
    });
  }
}
