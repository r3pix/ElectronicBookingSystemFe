import { FormGroup, FormControl, Validators } from '@angular/forms';
export class AddOpinonForm extends FormGroup{
  constructor(){
    super({
      roomId: new FormControl(null),
      userId: new FormControl(null),
      comment: new FormControl(null, [Validators.required]),
      grade: new FormControl(null, [Validators.required])
    });
  }
}
