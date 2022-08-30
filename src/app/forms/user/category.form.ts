import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

export class CategoryForm extends FormGroup{
  constructor(){
    super({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required])
    });
  };
}
