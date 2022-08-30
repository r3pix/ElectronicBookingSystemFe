import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
export class RoomForm extends FormGroup{
  constructor(){
    super({
      id: new FormControl(null),
      name: new FormControl(null,[Validators.required]),
      totalMaxPlaces: new FormControl(null, [Validators.required]),
      totalMaxTables: new FormControl(null,[Validators.required]),
      width: new FormControl(null, [Validators.required]),
      height: new FormControl(null, [Validators.required]),
      length: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      cost: new FormControl(null, [Validators.required]),
      categoryId: new FormControl(null,[Validators.required])
    });
  }
}
