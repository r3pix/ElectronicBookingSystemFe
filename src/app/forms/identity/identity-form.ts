import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
export class IdentityForm extends FormGroup{
  constructor(){
    super({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required])
    });
  }
}
