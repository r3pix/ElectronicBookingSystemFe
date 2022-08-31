import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
export class ServiceForm extends FormGroup{
  constructor(){
    super({
      id: new FormControl(null),
      name: new FormControl(null,[Validators.required]),
      cost: new FormControl(null, [Validators.required]),
      description: new FormControl(null,[Validators.required])
    });
  }
}
